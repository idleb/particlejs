import ColorRgba from '../util/colorRgba';
import Particle from '../particles/particle';
import PDParticle from '../particles/PDParticle';
import Engine from '../core/engine';

export default class CustomSystem {
    public static EMITTER_TYPE_GRAVITY: number = 0;
    public static EMITTER_TYPE_RADIAL: number = 1;
    // emitter configuration                            // .pex element name
    private _emitterType: number;                       // emitterType
    private _emitterXVariance: number;               // sourcePositionVariance x
    private _emitterYVariance: number;               // sourcePositionVariance y
    private _defaultDuration: number;                // duration

    // particle configuration
    private _lifespan: number;                       // particleLifeSpan
    private _lifespanVariance: number;               // particleLifeSpanVariance
    private _startSize: number;                      // startParticleSize
    private _startSizeVariance: number;              // startParticleSizeVariance
    private _endSize: number;                        // finishParticleSize
    private _endSizeVariance: number;                // finishParticleSizeVariance
    private _emitAngle: number;                      // angle
    private _emitAngleVariance: number;              // angleVariance
    private _startRotation: number;                  // rotationStart
    private _startRotationVariance: number;          // rotationStartVariance
    private _endRotation: number;                    // rotationEnd
    private _endRotationVariance: number;            // rotationEndVariance

    // gravity configuration
    private _speed: number;                          // speed
    private _speedVariance: number;                  // speedVariance
    private _gravityX: number;                       // gravity x
    private _gravityY: number;                       // gravity y
    private _radialAcceleration: number;             // radialAcceleration
    private _radialAccelerationVariance: number;     // radialAccelerationVariance
    private _tangentialAcceleration: number;         // tangentialAcceleration
    private _tangentialAccelerationVariance: number; // tangentialAccelerationVariance

    // radial configuration 
    private _maxRadius: number;                      // maxRadius
    private _maxRadiusVariance: number;              // maxRadiusVariance
    private _minRadius: number;                      // minRadius
    private _minRadiusVariance: number;              // minRadiusVariance
    private _rotatePerSecond: number;                // rotatePerSecond
    private _rotatePerSecondVariance: number;        // rotatePerSecondVariance

    // color configuration
    private _startColor: ColorRgba;                  // startColor
    private _startColorVariance: ColorRgba;          // startColorVariance
    private _endColor: ColorRgba;                    // finishColor
    private _endColorVariance: ColorRgba;            // finishColorVariance

    private _stage: CanvasRenderingContext2D;
    private _engine: Engine;

    public blendFactorSource: String;

    constructor(cvs: HTMLCanvasElement, config: any) {
        this._stage = cvs.getContext('2d');
        this.parseConfig(config)

        this._engine = new Engine(this._stage, {
            particleCreate: this.createParticle.bind(this),
            particleUpdate: this.updateParticle.bind(this),
            onParticleAdvance: this.advanceParticle.bind(this)
        })

        this.capacity = parseInt(config.capacity);
        this.updateEmissionRate();
    }
    private createParticle(): Particle {
        return new PDParticle(this._stage);
    }
    private updateParticle(aParticle: Particle): void {
        let particle: PDParticle = aParticle as PDParticle;

        // for performance reasons, the random variances are calculated inline instead
        // of calling a function

        let lifespan: number = this._lifespan + this._lifespanVariance * (Math.random() * 2.0 - 1.0);
        let textureWidth: number = 16;

        particle.currentTime = 0.0;
        particle.totalTime = lifespan > 0.0 ? lifespan : 0.0;

        if (lifespan <= 0.0) return;

        let emitterX: number = this.emitterX;
        let emitterY: number = this.emitterY;

        particle.x = emitterX + this._emitterXVariance * (Math.random() * 2.0 - 1.0);
        particle.y = emitterY + this._emitterYVariance * (Math.random() * 2.0 - 1.0);
        particle.startX = emitterX;
        particle.startY = emitterY;

        let angle: number = this._emitAngle + this._emitAngleVariance * (Math.random() * 2.0 - 1.0);
        let speed: number = this._speed + this._speedVariance * (Math.random() * 2.0 - 1.0);
        particle.velocityX = speed * Math.cos(angle);
        particle.velocityY = speed * Math.sin(angle);

        let startRadius: number = this._maxRadius + this._maxRadiusVariance * (Math.random() * 2.0 - 1.0);
        let endRadius: number = this._minRadius + this._minRadiusVariance * (Math.random() * 2.0 - 1.0);
        particle.emitRadius = startRadius;
        particle.emitRadiusDelta = (endRadius - startRadius) / lifespan;
        particle.emitRotation = this._emitAngle + this._emitAngleVariance * (Math.random() * 2.0 - 1.0);
        particle.emitRotationDelta = this._rotatePerSecond + this._rotatePerSecondVariance * (Math.random() * 2.0 - 1.0);
        particle.radialAcceleration = this._radialAcceleration + this._radialAccelerationVariance * (Math.random() * 2.0 - 1.0);
        particle.tangentialAcceleration = this._tangentialAcceleration + this._tangentialAccelerationVariance * (Math.random() * 2.0 - 1.0);

        let startSize: number = this._startSize + this._startSizeVariance * (Math.random() * 2.0 - 1.0);
        let endSize: number = this._endSize + this._endSizeVariance * (Math.random() * 2.0 - 1.0);
        if (startSize < 0.1) startSize = 0.1;
        if (endSize < 0.1) endSize = 0.1;
        particle.scale = startSize / textureWidth;
        particle.scaleDelta = ((endSize - startSize) / lifespan) / textureWidth;

        // colors

        let startColor: ColorRgba = particle.colorRgba;
        let colorDelta: ColorRgba = particle.colorRgbaDelta;

        startColor.red = this._startColor.red;
        startColor.green = this._startColor.green;
        startColor.blue = this._startColor.blue;
        startColor.alpha = this._startColor.alpha;

        if (this._startColorVariance.red != 0) startColor.red += this._startColorVariance.red * (Math.random() * 2.0 - 1.0);
        if (this._startColorVariance.green != 0) startColor.green += this._startColorVariance.green * (Math.random() * 2.0 - 1.0);
        if (this._startColorVariance.blue != 0) startColor.blue += this._startColorVariance.blue * (Math.random() * 2.0 - 1.0);
        if (this._startColorVariance.alpha != 0) startColor.alpha += this._startColorVariance.alpha * (Math.random() * 2.0 - 1.0);

        let endColorRed: number = this._endColor.red;
        let endColorGreen: number = this._endColor.green;
        let endColorBlue: number = this._endColor.blue;
        let endColorAlpha: number = this._endColor.alpha;

        if (this._endColorVariance.red != 0) endColorRed += this._endColorVariance.red * (Math.random() * 2.0 - 1.0);
        if (this._endColorVariance.green != 0) endColorGreen += this._endColorVariance.green * (Math.random() * 2.0 - 1.0);
        if (this._endColorVariance.blue != 0) endColorBlue += this._endColorVariance.blue * (Math.random() * 2.0 - 1.0);
        if (this._endColorVariance.alpha != 0) endColorAlpha += this._endColorVariance.alpha * (Math.random() * 2.0 - 1.0);

        colorDelta.red = (endColorRed - startColor.red) / lifespan;
        colorDelta.green = (endColorGreen - startColor.green) / lifespan;
        colorDelta.blue = (endColorBlue - startColor.blue) / lifespan;
        colorDelta.alpha = (endColorAlpha - startColor.alpha) / lifespan;

        // rotation

        let startRotation: number = this._startRotation + this._startRotationVariance * (Math.random() * 2.0 - 1.0);
        let endRotation: number = this._endRotation + this._endRotationVariance * (Math.random() * 2.0 - 1.0);

        particle.rotation = startRotation;
        particle.rotationDelta = (endRotation - startRotation) / lifespan;
    }

    private advanceParticle(aParticle: Particle, passedTime: number): void {
        let particle: PDParticle = aParticle as PDParticle;

        let restTime: number = particle.totalTime - particle.currentTime;
        passedTime = restTime > passedTime ? passedTime : restTime;
        particle.currentTime += passedTime;

        if (this._emitterType == CustomSystem.EMITTER_TYPE_RADIAL) {
            particle.emitRotation += particle.emitRotationDelta * passedTime;
            particle.emitRadius += particle.emitRadiusDelta * passedTime;
            particle.x = this.emitterX - Math.cos(particle.emitRotation) * particle.emitRadius;
            particle.y = this.emitterY - Math.sin(particle.emitRotation) * particle.emitRadius;
        }
        else {
            let distanceX: number = particle.x - particle.startX;
            let distanceY: number = particle.y - particle.startY;
            let distanceScalar: number = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
            if (distanceScalar < 0.01) distanceScalar = 0.01;

            let radialX: number = distanceX / distanceScalar;
            let radialY: number = distanceY / distanceScalar;
            let tangentialX: number = radialX;
            let tangentialY: number = radialY;

            radialX *= particle.radialAcceleration;
            radialY *= particle.radialAcceleration;

            let newY: number = tangentialX;
            tangentialX = -tangentialY * particle.tangentialAcceleration;
            tangentialY = newY * particle.tangentialAcceleration;

            particle.velocityX += passedTime * (this._gravityX + radialX + tangentialX);
            particle.velocityY += passedTime * (this._gravityY + radialY + tangentialY);
            particle.x += particle.velocityX * passedTime;
            particle.y += particle.velocityY * passedTime;
        }

        particle.scale += particle.scaleDelta * passedTime;
        particle.rotation += particle.rotationDelta * passedTime;

        particle.colorRgba.red += particle.colorRgbaDelta.red * passedTime;
        particle.colorRgba.green += particle.colorRgbaDelta.green * passedTime;
        particle.colorRgba.blue += particle.colorRgbaDelta.blue * passedTime;
        particle.colorRgba.alpha = Math.max(0, particle.colorRgba.alpha + particle.colorRgbaDelta.alpha * passedTime);

        particle.color = particle.colorRgba.toRgb();
        particle.alpha = particle.colorRgba.alpha;
    }
    private updateEmissionRate(): void {
        this._engine.emissionRate = (this.capacity - 1) / this._lifespan;
    }
    private parseConfig(config: any) {
        this._emitterXVariance = parseFloat(config.sourcePositionVariance.x);
        this._emitterYVariance = parseFloat(config.sourcePositionVariance.y);
        this._gravityX = parseFloat(config.gravity.x);
        this._gravityY = parseFloat(config.gravity.y);
        this._emitterType = parseInt(config.emitterType);
        this._lifespan = Math.max(0.01, config.lifespan);
        this._lifespanVariance = parseFloat(config.lifespanVariance);
        this._startSize = parseFloat(config.startSize);
        this._startSizeVariance = parseFloat(config.startSizeVariance);
        this._endSize = parseFloat(config.endSize);
        this._endSizeVariance = parseFloat(config.endSizeVariance);
        this._emitAngle = deg2rad(config.emitAngle);
        this._emitAngleVariance = deg2rad(config.emitAngleVariance);
        this._startRotation = deg2rad(config.startRotation);
        this._startRotationVariance = deg2rad(config.startRotationVariance);
        this._endRotation = deg2rad(config.endRotation);
        this._endRotationVariance = deg2rad(config.endRotationVariance);
        this._speed = parseFloat(config.speed);
        this._speedVariance = parseFloat(config.speedVariance);
        this._radialAcceleration = parseFloat(config.radialAcceleration);
        this._radialAccelerationVariance = parseFloat(config.radialAccelerationVariance);
        this._tangentialAcceleration = parseFloat(config.tangentialAcceleration);
        this._tangentialAccelerationVariance = parseFloat(config.tangentialAccelerationVariance);
        this._maxRadius = parseFloat(config.maxRadius);
        this._maxRadiusVariance = parseFloat(config.maxRadiusVariance);
        this._minRadius = parseFloat(config.minRadius);
        this._minRadiusVariance = parseFloat(config.minRadiusVariance);
        this._rotatePerSecond = deg2rad(config.rotatePerSecond);
        this._rotatePerSecondVariance = deg2rad(config.rotatePerSecondVariance);
        this._startColor = getColor(config.startColor);
        this._startColorVariance = getColor(config.startColorVariance);
        this._endColor = getColor(config.endColor);
        this._endColorVariance = getColor(config.endColorVariance);
        this.blendFactorSource = getBlendFunc(parseInt(config.blendFuncSource));
        this.defaultDuration = parseFloat(config.duration);

        // compatibility with future Particle Designer versions
        // (might fix some of the uppercase/lowercase typos)

        if (isNaN(this._endSizeVariance))
            this._endSizeVariance = config.finishParticleSizeVariance;
        if (isNaN(this._lifespan))
            this._lifespan = Math.max(0.01, config.particleLifespan);
        if (isNaN(this._lifespanVariance))
            this._lifespanVariance = config.particleLifeSpanVariance;
        if (isNaN(this._minRadiusVariance))
            this._minRadiusVariance = 0.0;



        function deg2rad(element: number): number {
            return Math.PI * element / 180
        }

        function getColor(element: any): ColorRgba {
            return new ColorRgba(
                parseFloat(element.red),
                parseFloat(element.green),
                parseFloat(element.blue),
                parseFloat(element.alpha),
            );
        }

        function getBlendFunc(value: number): String {
            switch (value) {
                case 0: return "source-over";
                case 1: return "source-atop";
                case 2: return "source-in";
                case 3: return "source-out";
                case 4: return "destination-over";
                case 5: return "destination-atop";
                case 6: return "destination-in";
                case 7: return "destination-out";
                case 8: return "lighter";
                case 9: return "copy";
                case 10: return "xor";
                default: throw new Error("unsupported blending function: " + value);
            }
        }
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

    get emitterType(): number { return this._emitterType; }
    set emitterType(value: number) { this._emitterType = value; }

    get emitterXVariance(): number { return this._emitterXVariance; }
    set emitterXVariance(value: number) { this._emitterXVariance = value; }

    get emitterYVariance(): number { return this._emitterYVariance; }
    set emitterYVariance(value: number) { this._emitterYVariance = value; }

    get defaultDuration(): number { return this._defaultDuration; }
    set defaultDuration(value: number) {
        this._defaultDuration = value < 0 ? Number.MAX_VALUE : value;
    }

    get capacity(): number { return this._engine.capacity }

    set capacity(value: number) {
        this._engine.capacity = value;
        this.updateEmissionRate();
    }

    get lifespan(): number { return this._lifespan; }
    set lifespan(value: number) {
        this._lifespan = Math.max(0.01, value);
        this.updateEmissionRate();
    }

    get lifespanVariance(): number { return this._lifespanVariance; }
    set lifespanVariance(value: number) { this._lifespanVariance = value; }

    get startSize(): number { return this._startSize; }
    set startSize(value: number) { this._startSize = value; }

    get startSizeVariance(): number { return this._startSizeVariance; }
    set startSizeVariance(value: number) { this._startSizeVariance = value; }

    get endSize(): number { return this._endSize; }
    set endSize(value: number) { this._endSize = value; }

    get endSizeVariance(): number { return this._endSizeVariance; }
    set endSizeVariance(value: number) { this._endSizeVariance = value; }

    get emitAngle(): number { return this._emitAngle; }
    set emitAngle(value: number) { this._emitAngle = value; }

    get emitAngleVariance(): number { return this._emitAngleVariance; }
    set emitAngleVariance(value: number) { this._emitAngleVariance = value; }

    get startRotation(): number { return this._startRotation; }
    set startRotation(value: number) { this._startRotation = value; }

    get startRotationVariance(): number { return this._startRotationVariance; }
    set startRotationVariance(value: number) { this._startRotationVariance = value; }

    get endRotation(): number { return this._endRotation; }
    set endRotation(value: number) { this._endRotation = value; }

    get endRotationVariance(): number { return this._endRotationVariance; }
    set endRotationVariance(value: number) { this._endRotationVariance = value; }

    get speed(): number { return this._speed; }
    set speed(value: number) { this._speed = value; }

    get speedVariance(): number { return this._speedVariance; }
    set speedVariance(value: number) { this._speedVariance = value; }

    get gravityX(): number { return this._gravityX; }
    set gravityX(value: number) { this._gravityX = value; }

    get gravityY(): number { return this._gravityY; }
    set gravityY(value: number) { this._gravityY = value; }

    get radialAcceleration(): number { return this._radialAcceleration; }
    set radialAcceleration(value: number) { this._radialAcceleration = value; }

    get radialAccelerationVariance(): number { return this._radialAccelerationVariance; }
    set radialAccelerationVariance(value: number) { this._radialAccelerationVariance = value; }

    get tangentialAcceleration(): number { return this._tangentialAcceleration; }
    set tangentialAcceleration(value: number) { this._tangentialAcceleration = value; }

    get tangentialAccelerationVariance(): number { return this._tangentialAccelerationVariance; }
    set tangentialAccelerationVariance(value: number) { this._tangentialAccelerationVariance = value; }

    get maxRadius(): number { return this._maxRadius; }
    set maxRadius(value: number) { this._maxRadius = value; }

    get maxRadiusVariance(): number { return this._maxRadiusVariance; }
    set maxRadiusVariance(value: number) { this._maxRadiusVariance = value; }

    get minRadius(): number { return this._minRadius; }
    set minRadius(value: number) { this._minRadius = value; }

    get minRadiusVariance(): number { return this._minRadiusVariance; }
    set minRadiusVariance(value: number) { this._minRadiusVariance = value; }

    get rotatePerSecond(): number { return this._rotatePerSecond; }
    set rotatePerSecond(value: number) { this._rotatePerSecond = value; }

    get rotatePerSecondVariance(): number { return this._rotatePerSecondVariance; }
    set rotatePerSecondVariance(value: number) { this._rotatePerSecondVariance = value; }

    get startColor(): ColorRgba { return this._startColor; }
    set startColor(value: ColorRgba) { this._startColor = value; }

    get startColorVariance(): ColorRgba { return this._startColorVariance; }
    set startColorVariance(value: ColorRgba) { this._startColorVariance = value; }

    get endColor(): ColorRgba { return this._endColor; }
    set endColor(value: ColorRgba) { this._endColor = value; }

    get endColorVariance(): ColorRgba { return this._endColorVariance; }
    set endColorVariance(value: ColorRgba) { this._endColorVariance = value; }
}