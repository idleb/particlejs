import Particle from '../particles/particle';
import Engine from '../core/engine';

export default class SimpleSystem {
    private _stage: CanvasRenderingContext2D;
    private _engine: Engine;

    constructor(cvs: HTMLCanvasElement) {
        this._stage = cvs.getContext('2d');

        this._engine = new Engine(this._stage, {
            particleCreate: this.createParticle,
            particleUpdate: this.updateParticle,
            onParticleAdvance: this.advanceParticle
        })
        this._engine.capacity = 128;
        
        // updateBlendMode();
    }

    private createParticle(): Particle {
        return new Particle(this._stage)
    }

    private updateParticle(particle: Particle): void {
        particle.x = this.emitterX;
        particle.y = this.emitterY;
        particle.currentTime = 0;
        particle.totalTime = 1;
        particle.color = Math.round(Math.random() * 0xffffff);
    }

    private advanceParticle(particle: Particle, passedTime: number): void {
        particle.y += passedTime * 250;
        particle.alpha = 1.0 - particle.currentTime / particle.totalTime;
        particle.currentTime += passedTime;
    }

    public start(duration: number = Number.MAX_VALUE): void {
        this._engine.start(duration)
    }

    public stop(clearParticles: boolean = false): void {
        this._engine.stop(clearParticles)
    }

    public clear(): void {
        this._engine.clear()
    }

    get emitterX(): number { return this._engine.emitterX; }
    set emitterX(value: number) { this._engine.emitterX = value; }

    get emitterY(): number { return this._engine.emitterY; }
    set emitterY(value: number) { this._engine.emitterY = value; }

    get engine(): Engine { return this._engine; }

}