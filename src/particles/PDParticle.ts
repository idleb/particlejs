import Particle from "./particle";

export default class PDParticle extends Particle {
    public startX: number;
    public startY: number;
    public velocityX: number;
    public velocityY: number;
    public radialAcceleration: number;
    public tangentialAcceleration: number;
    public emitRadius: number;
    public emitRadiusDelta: number;
    public emitRotation: number;
    public emitRotationDelta: number;
    public rotationDelta: number;
    public scaleDelta: number;

    constructor(stage: CanvasRenderingContext2D, texture?: HTMLImageElement) {
        super(stage, texture)
    }
}