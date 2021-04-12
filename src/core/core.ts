const requestAnimFrame = (function () {
    return function (callback: Function) {
            window.setTimeout(callback, 10000 / 60);     //定义每秒执行60次动画
        };
})();

export default class Core {
    protected static EVENT_COMPLETE: Event = new Event('complete');

    private _eventTarget: EventTarget;

    private _createTime: number;
    private _frameTimestamp: number;

    constructor() {
        this._eventTarget = new EventTarget()

        this._createTime = Date.now();
        this._frameTimestamp = this.getTimer() / 1000.0;
    }
    
    private nextFrame(): void {
        var now: number = this.getTimer() / 1000.0;
        var passedTime: number = now - this._frameTimestamp;
        this._frameTimestamp = now;

        if (passedTime > 1.0) passedTime = 1.0;

        if (passedTime < 0.0) {
            this._createTime = Date.now();
            passedTime = 0;
        }

        this.advanceTime(passedTime);

        requestAnimFrame(this.nextFrame.bind(this))
    }

    private getTimer():number{
        return Date.now() - this._createTime;
    }

    public start(): void {
        this.nextFrame()
    }

    public dispatchEvent(e: Event){
        this._eventTarget.dispatchEvent(e);
    }

    protected advanceTime(passedTime:number){

    }
}