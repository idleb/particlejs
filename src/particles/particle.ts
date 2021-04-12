import ColorRgba from '../util/colorRgba'

export default class Particle {
    private _stage: CanvasRenderingContext2D;
    private _texture: HTMLImageElement;
    private _color: number;

    public colorRgba: ColorRgba;
    public colorRgbaDelta: ColorRgba;
    public x: number;
    public y: number;
    public scale: number;
    public rotation: number;
    public alpha: number;
    public currentTime: number;
    public totalTime: number;
    public width: number;
    public height: number;

    constructor(stage: CanvasRenderingContext2D, texture?: HTMLImageElement) {
        this._stage = stage
        this._texture = texture

        this.x = this.y = this.rotation = this.currentTime = 0.0;
        this.totalTime = this.alpha = this.scale = 1.0;
        this.color = 0xffffff;
        this.width = 16;
        this.height = 16;
        
        this.colorRgba = new ColorRgba();
        this.colorRgbaDelta = new ColorRgba();
    }

    public paint(): void {
        const pivotX: number = this.width / 2;
        const pivotY: number = this.height / 2;
        const offsetX = pivotX * (1 - this.scale);
        const offsetY = pivotY * (1 - this.scale);
        const x = this.x + offsetX;
        const y = this.y + offsetY;

        this._stage.save()

        if (this.rotation) {
            this._stage.rotate(this.rotation);
        }

        const grd = this._stage.createRadialGradient(x + this.width * this.scale / 2, y + this.height * this.scale / 2, 5, x + this.width * this.scale / 2, y + this.height * this.scale / 2, this.width * this.scale / 2);
        grd.addColorStop(0, ColorRgba.replace(this.colorRgba, { alpha: this.alpha }).toString());
        grd.addColorStop(0.5, ColorRgba.replace(this.colorRgba, { alpha: 0.7 * this.alpha }).toString());
        grd.addColorStop(1, ColorRgba.replace(this.colorRgba, { alpha: 0 }).toString());

        this._stage.fillStyle = grd;
        this._stage.fillRect(x, y, this.width * this.scale, this.height * this.scale);

        this._stage.restore()
    }

    public set color(value: number) {
        this._color = value
        // this.colorRgba = ColorRgba.replace(ColorRgba.fromRgb(value), { alpha: this.alpha })
    }

    public get color(): number {
        return this._color
    }

    // public set texture(value: HTMLImageElement) {
    //     this._texture = value;
    //     this.width = value.width;
    //     this.height = value.height;
    // }

    // public get texture(): HTMLImageElement {
    //     return this._texture
    // }
}