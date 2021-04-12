import Particle from '../particles/particle';
import Core from './core';

export default class Engine extends Core {
    public static MAX_NUM_PARTICLES: number = 16383;

    protected _stage: CanvasRenderingContext2D;

    private _particles: Array<Particle>;
    private _frameTime: number;
    private _numParticles: number = 0;
    private _emissionRate: number; // emitted particles per second
    private _emissionTime: number;
    private _emitterX: number;
    private _emitterY: number;

    // smoothed emitter positions
    private _emitterNextX: number;
    private _emitterNextY: number;

    private _capacity: number = 0
    private _texture: HTMLImageElement

    private _particleCreate: () => Particle
    private _particleUpdate: (p: Particle) => void
    private _onParticleAdvance: (p: Particle, passedTime: number) => void

    constructor(
        stage: CanvasRenderingContext2D = null,
        options?: {
            particleCreate?: () => Particle,
            particleUpdate?: (p: Particle) => void,
            onParticleAdvance?: (p: Particle, passedTime: number) => void
        }
    ) {
        super();

        this._capacity = 0;
        this._particles = [];
        this._frameTime = 0.0;
        this._emitterX = this._emitterY = 0.0;
        this._emitterNextX = this._emitterNextY = 0.0;
        this._emissionTime = 0.0;
        this._emissionRate = 60;

        this._particleCreate = options?.particleCreate
        this._particleUpdate = options?.particleUpdate
        this._onParticleAdvance = options?.onParticleAdvance

        this._stage = stage;

        // updateBlendMode();
    }

    protected createParticle(): Particle {
        return this._particleCreate ? this._particleCreate() : new Particle(this._stage, this._texture)
    }

    protected updateParticle(particle: Particle): void {
        if (this._particleUpdate) {
            this._particleUpdate(particle)
        }
    }

    protected advanceParticle(particle: Particle, passedTime: number): void {
        if (this._onParticleAdvance) {
            this._onParticleAdvance(particle, passedTime)
        }
    }

    public start(duration: number = Number.MAX_VALUE): void {
        super.start()
        if (this._emissionRate != 0)
            this._emissionTime = duration;
    }

    public stop(clearParticles: boolean = false): void {
        this._emissionTime = 0.0;
        if (clearParticles) this.clear();
    }

    public clear(): void {
        this._numParticles = 0;
    }

    protected advanceTime(passedTime: number) {
        super.advanceTime(passedTime);

        if (!this._stage) return
        this._stage.clearRect(0, 0, 500, 500);

        let particleIndex: number = 0;
        let particle: Particle;
        const maxNumParticles: number = this.capacity;
        while (particleIndex < this._numParticles) {
            particle = this._particles[particleIndex];

            if (particle.currentTime < particle.totalTime) {
                this.advanceParticle(particle, passedTime);
                ++particleIndex;
            } else {
                if (particleIndex != this._numParticles - 1) {
                    const nextParticle: Particle = this._particles[this._numParticles - 1];
                    this._particles[this._numParticles - 1] = particle;
                    this._particles[particleIndex] = nextParticle;
                }

                --this._numParticles;

                if (this._numParticles == 0 && this._emissionTime == 0)
                    this.dispatchEvent(Engine.EVENT_COMPLETE);
            }
        }
        if (this._emissionTime > 0) {
            this._frameTime += passedTime;

            let frameTimeRatio: number;
            const emitterLastX: number = this._emitterX;
            const emitterLastY: number = this._emitterY;
            const emitterMoveX: number = this._emitterNextX - emitterLastX;
            const emitterMoveY: number = this._emitterNextY - emitterLastY;
            let timeBetweenParticles: number = 1.0 / this._emissionRate;

            if (this._numParticles < maxNumParticles &&
                this._numParticles + (this._frameTime / timeBetweenParticles) > maxNumParticles) {
                timeBetweenParticles = this._frameTime / (maxNumParticles - this._numParticles);
            }

            while (this._frameTime > 0) {
                if (this._numParticles < maxNumParticles) {
                    if (emitterMoveX || emitterMoveY) {
                        frameTimeRatio = 1.0 - (this._frameTime / passedTime);
                        this._emitterX = emitterLastX + emitterMoveX * frameTimeRatio;
                        this._emitterY = emitterLastY + emitterMoveY * frameTimeRatio;
                    }

                    particle = this._particles[this._numParticles];
                    this.updateParticle(particle);

                    if (particle.totalTime > 0.0) {
                        this.advanceParticle(particle, this._frameTime);
                        ++this._numParticles;
                    }
                }

                this._frameTime -= timeBetweenParticles;
            }

            if (this._emissionTime != Number.MAX_VALUE)
                this._emissionTime = this._emissionTime > passedTime ? this._emissionTime - passedTime : 0.0;

            if (this._numParticles == 0 && this._emissionTime == 0)
                this.dispatchEvent(Engine.EVENT_COMPLETE);
        }

        this._emitterX = this._emitterNextX;
        this._emitterY = this._emitterNextY;

        for (let i = 0; i < this._numParticles; ++i) {
            particle = this._particles[i];
            particle.paint()
        }
    }

    get capacity(): number {
        return this._capacity;
    }

    set capacity(value: number) {
        let i: number;
        const oldCapacity: number = this._capacity;
        const newCapacity: number = value > Engine.MAX_NUM_PARTICLES ? Engine.MAX_NUM_PARTICLES : value;
        for (i = oldCapacity; i < newCapacity; ++i) {
            this._particles[i] = this.createParticle();
        }

        if (newCapacity < oldCapacity) {
            this._particles.length = newCapacity;
            if (this._numParticles > newCapacity)
                this._numParticles = newCapacity;
        }
        this._capacity = value
    }

    get isEmitting(): boolean { return this._emissionTime > 0 && this._emissionRate > 0; }
    get numParticles(): number { return this._numParticles; }

    get emissionRate(): number { return this._emissionRate; }
    set emissionRate(value: number) { this._emissionRate = value; }

    get emitterX(): number { return this._emitterX; }
    set emitterX(value: number) { this._emitterX = this._emitterNextX = value; }

    get emitterY(): number { return this._emitterY; }
    set emitterY(value: number) { this._emitterY = this._emitterNextY = value; }
}