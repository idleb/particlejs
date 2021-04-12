export default class ColorRgba {
    public red: number;
    public green: number;
    public blue: number;
    public alpha: number;

    public static fromRgb(color: number): ColorRgba {
        const rgb: ColorRgba = new ColorRgba();
        rgb.fromRgb(color);
        return rgb;
    }

    public static fromRgba(color: number): ColorRgba {
        const rgba: ColorRgba = new ColorRgba();
        rgba.fromRgba(color);
        return rgba;
    }

    public static replace(color: ColorRgba, values: { red?: number, green?: number, blue?: number, alpha?: number }): ColorRgba {
        return new ColorRgba(
            values.hasOwnProperty('red') ? values.red : color.red,
            values.hasOwnProperty('green') ? values.green : color.green,
            values.hasOwnProperty('blue') ? values.blue : color.blue,
            values.hasOwnProperty('alpha') ? values.alpha : color.alpha,
        )
    }

    constructor(red: number = 0, green: number = 0, blue: number = 0, alpha: number = 0) {
        this.red = red;
        this.green = green;
        this.blue = blue;
        this.alpha = alpha;
    }

    public toRgb(): number {
        let r: number = this.red; if (r < 0.0) r = 0.0; else if (r > 255.0) r = 255.0;
        let g: number = this.green; if (g < 0.0) g = 0.0; else if (g > 255.0) g = 255.0;
        let b: number = this.blue; if (b < 0.0) b = 0.0; else if (b > 255.0) b = 255.0;

        return r << 16 | g << 8 | b;
    }

    public toRgba(): number {
        let r: number = this.red; if (r < 0.0) r = 0.0; else if (r > 255.0) r = 255.0;
        let g: number = this.green; if (g < 0.0) g = 0.0; else if (g > 255.0) g = 255.0;
        let b: number = this.blue; if (b < 0.0) b = 0.0; else if (b > 255.0) b = 255.0;
        let a: number = this.alpha; if (a < 0.0) a = 0.0; else if (a > 1.0) a = 1.0;

        return r << 24 | g << 16 | b << 8 | ~~(a * 255);
    }

    public fromRgb(color: number): void {
        this.red = color >> 16 & 0xFF;
        this.green = color >> 8 & 0xFF;
        this.blue = color & 0xFF;
        this.alpha = 1
    }

    public fromRgba(color: number): void {
        this.red = color >> 24 & 0xFF;
        this.green = color >> 16 & 0xFF;
        this.blue = color >> 8 & 0xFF;
        this.alpha = (color & 0xFF) / 255.0;
    }

    public copyFrom(Rgba: ColorRgba): void {
        this.red = Rgba.red;
        this.green = Rgba.green;
        this.blue = Rgba.blue;
        this.alpha = Rgba.alpha;
    }

    public toHex(): string {
        return '#' + this.toRgb().toString(16);
    }

    public toString(): string {
        return `rgba(${this.red},${this.green},${this.blue},${this.alpha})`;
    }
}