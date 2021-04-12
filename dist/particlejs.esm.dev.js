var ColorRgba = /** @class */ (function () {
    function ColorRgba(red, green, blue, alpha) {
        if (red === void 0) { red = 0; }
        if (green === void 0) { green = 0; }
        if (blue === void 0) { blue = 0; }
        if (alpha === void 0) { alpha = 0; }
        this.red = red;
        this.green = green;
        this.blue = blue;
        this.alpha = alpha;
    }
    ColorRgba.fromRgb = function (color) {
        var rgb = new ColorRgba();
        rgb.fromRgb(color);
        return rgb;
    };
    ColorRgba.fromRgba = function (color) {
        var rgba = new ColorRgba();
        rgba.fromRgba(color);
        return rgba;
    };
    ColorRgba.replace = function (color, values) {
        return new ColorRgba(values.hasOwnProperty('red') ? values.red : color.red, values.hasOwnProperty('green') ? values.green : color.green, values.hasOwnProperty('blue') ? values.blue : color.blue, values.hasOwnProperty('alpha') ? values.alpha : color.alpha);
    };
    ColorRgba.prototype.toRgb = function () {
        var r = this.red;
        if (r < 0.0)
            r = 0.0;
        else if (r > 255.0)
            r = 255.0;
        var g = this.green;
        if (g < 0.0)
            g = 0.0;
        else if (g > 255.0)
            g = 255.0;
        var b = this.blue;
        if (b < 0.0)
            b = 0.0;
        else if (b > 255.0)
            b = 255.0;
        return r << 16 | g << 8 | b;
    };
    ColorRgba.prototype.toRgba = function () {
        var r = this.red;
        if (r < 0.0)
            r = 0.0;
        else if (r > 255.0)
            r = 255.0;
        var g = this.green;
        if (g < 0.0)
            g = 0.0;
        else if (g > 255.0)
            g = 255.0;
        var b = this.blue;
        if (b < 0.0)
            b = 0.0;
        else if (b > 255.0)
            b = 255.0;
        var a = this.alpha;
        if (a < 0.0)
            a = 0.0;
        else if (a > 1.0)
            a = 1.0;
        return r << 24 | g << 16 | b << 8 | ~~(a * 255);
    };
    ColorRgba.prototype.fromRgb = function (color) {
        this.red = color >> 16 & 0xFF;
        this.green = color >> 8 & 0xFF;
        this.blue = color & 0xFF;
        this.alpha = 1;
    };
    ColorRgba.prototype.fromRgba = function (color) {
        this.red = color >> 24 & 0xFF;
        this.green = color >> 16 & 0xFF;
        this.blue = color >> 8 & 0xFF;
        this.alpha = (color & 0xFF) / 255.0;
    };
    ColorRgba.prototype.copyFrom = function (Rgba) {
        this.red = Rgba.red;
        this.green = Rgba.green;
        this.blue = Rgba.blue;
        this.alpha = Rgba.alpha;
    };
    ColorRgba.prototype.toHex = function () {
        return '#' + this.toRgb().toString(16);
    };
    ColorRgba.prototype.toString = function () {
        return "rgba(" + this.red + "," + this.green + "," + this.blue + "," + this.alpha + ")";
    };
    return ColorRgba;
}());

var Particle = /** @class */ (function () {
    function Particle(stage, texture) {
        this._stage = stage;
        this._texture = texture;
        this.x = this.y = this.rotation = this.currentTime = 0.0;
        this.totalTime = this.alpha = this.scale = 1.0;
        this.color = 0xffffff;
        this.width = 16;
        this.height = 16;
        this.colorRgba = new ColorRgba();
        this.colorRgbaDelta = new ColorRgba();
    }
    Particle.prototype.paint = function () {
        var pivotX = this.width / 2;
        var pivotY = this.height / 2;
        var offsetX = pivotX * (1 - this.scale);
        var offsetY = pivotY * (1 - this.scale);
        var x = this.x + offsetX;
        var y = this.y + offsetY;
        this._stage.save();
        if (this.rotation) {
            this._stage.rotate(this.rotation);
        }
        var grd = this._stage.createRadialGradient(x + this.width * this.scale / 2, y + this.height * this.scale / 2, 5, x + this.width * this.scale / 2, y + this.height * this.scale / 2, this.width * this.scale / 2);
        grd.addColorStop(0, ColorRgba.replace(this.colorRgba, { alpha: this.alpha }).toString());
        grd.addColorStop(0.5, ColorRgba.replace(this.colorRgba, { alpha: 0.7 * this.alpha }).toString());
        grd.addColorStop(1, ColorRgba.replace(this.colorRgba, { alpha: 0 }).toString());
        this._stage.fillStyle = grd;
        this._stage.fillRect(x, y, this.width * this.scale, this.height * this.scale);
        this._stage.restore();
    };
    Object.defineProperty(Particle.prototype, "color", {
        get: function () {
            return this._color;
        },
        set: function (value) {
            this._color = value;
            // this.colorRgba = ColorRgba.replace(ColorRgba.fromRgb(value), { alpha: this.alpha })
        },
        enumerable: false,
        configurable: true
    });
    return Particle;
}());

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var requestAnimFrame = (function () {
    return function (callback) {
        window.setTimeout(callback, 10000 / 60); //定义每秒执行60次动画
    };
})();
var Core = /** @class */ (function () {
    function Core() {
        this._eventTarget = new EventTarget();
        this._createTime = Date.now();
        this._frameTimestamp = this.getTimer() / 1000.0;
    }
    Core.prototype.nextFrame = function () {
        var now = this.getTimer() / 1000.0;
        var passedTime = now - this._frameTimestamp;
        this._frameTimestamp = now;
        if (passedTime > 1.0)
            passedTime = 1.0;
        if (passedTime < 0.0) {
            this._createTime = Date.now();
            passedTime = 0;
        }
        this.advanceTime(passedTime);
        requestAnimFrame(this.nextFrame.bind(this));
    };
    Core.prototype.getTimer = function () {
        return Date.now() - this._createTime;
    };
    Core.prototype.start = function () {
        this.nextFrame();
    };
    Core.prototype.dispatchEvent = function (e) {
        this._eventTarget.dispatchEvent(e);
    };
    Core.prototype.advanceTime = function (passedTime) {
    };
    Core.EVENT_COMPLETE = new Event('complete');
    return Core;
}());

var Engine = /** @class */ (function (_super) {
    __extends(Engine, _super);
    function Engine(stage, options) {
        if (stage === void 0) { stage = null; }
        var _this = _super.call(this) || this;
        _this._numParticles = 0;
        _this._capacity = 0;
        _this._capacity = 0;
        _this._particles = [];
        _this._frameTime = 0.0;
        _this._emitterX = _this._emitterY = 0.0;
        _this._emitterNextX = _this._emitterNextY = 0.0;
        _this._emissionTime = 0.0;
        _this._emissionRate = 60;
        _this._particleCreate = options === null || options === void 0 ? void 0 : options.particleCreate;
        _this._particleUpdate = options === null || options === void 0 ? void 0 : options.particleUpdate;
        _this._onParticleAdvance = options === null || options === void 0 ? void 0 : options.onParticleAdvance;
        _this._stage = stage;
        return _this;
        // updateBlendMode();
    }
    Engine.prototype.createParticle = function () {
        return this._particleCreate ? this._particleCreate() : new Particle(this._stage, this._texture);
    };
    Engine.prototype.updateParticle = function (particle) {
        if (this._particleUpdate) {
            this._particleUpdate(particle);
        }
    };
    Engine.prototype.advanceParticle = function (particle, passedTime) {
        if (this._onParticleAdvance) {
            this._onParticleAdvance(particle, passedTime);
        }
    };
    Engine.prototype.start = function (duration) {
        if (duration === void 0) { duration = Number.MAX_VALUE; }
        _super.prototype.start.call(this);
        if (this._emissionRate != 0)
            this._emissionTime = duration;
    };
    Engine.prototype.stop = function (clearParticles) {
        if (clearParticles === void 0) { clearParticles = false; }
        this._emissionTime = 0.0;
        if (clearParticles)
            this.clear();
    };
    Engine.prototype.clear = function () {
        this._numParticles = 0;
    };
    Engine.prototype.advanceTime = function (passedTime) {
        _super.prototype.advanceTime.call(this, passedTime);
        if (!this._stage)
            return;
        this._stage.clearRect(0, 0, 500, 500);
        var particleIndex = 0;
        var particle;
        var maxNumParticles = this.capacity;
        while (particleIndex < this._numParticles) {
            particle = this._particles[particleIndex];
            if (particle.currentTime < particle.totalTime) {
                this.advanceParticle(particle, passedTime);
                ++particleIndex;
            }
            else {
                if (particleIndex != this._numParticles - 1) {
                    var nextParticle = this._particles[this._numParticles - 1];
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
            var frameTimeRatio = void 0;
            var emitterLastX = this._emitterX;
            var emitterLastY = this._emitterY;
            var emitterMoveX = this._emitterNextX - emitterLastX;
            var emitterMoveY = this._emitterNextY - emitterLastY;
            var timeBetweenParticles = 1.0 / this._emissionRate;
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
        for (var i = 0; i < this._numParticles; ++i) {
            particle = this._particles[i];
            particle.paint();
        }
    };
    Object.defineProperty(Engine.prototype, "capacity", {
        get: function () {
            return this._capacity;
        },
        set: function (value) {
            var i;
            var oldCapacity = this._capacity;
            var newCapacity = value > Engine.MAX_NUM_PARTICLES ? Engine.MAX_NUM_PARTICLES : value;
            for (i = oldCapacity; i < newCapacity; ++i) {
                this._particles[i] = this.createParticle();
            }
            if (newCapacity < oldCapacity) {
                this._particles.length = newCapacity;
                if (this._numParticles > newCapacity)
                    this._numParticles = newCapacity;
            }
            this._capacity = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Engine.prototype, "isEmitting", {
        get: function () { return this._emissionTime > 0 && this._emissionRate > 0; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Engine.prototype, "numParticles", {
        get: function () { return this._numParticles; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Engine.prototype, "emissionRate", {
        get: function () { return this._emissionRate; },
        set: function (value) { this._emissionRate = value; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Engine.prototype, "emitterX", {
        get: function () { return this._emitterX; },
        set: function (value) { this._emitterX = this._emitterNextX = value; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Engine.prototype, "emitterY", {
        get: function () { return this._emitterY; },
        set: function (value) { this._emitterY = this._emitterNextY = value; },
        enumerable: false,
        configurable: true
    });
    Engine.MAX_NUM_PARTICLES = 16383;
    return Engine;
}(Core));

var SimpleSystem = /** @class */ (function () {
    function SimpleSystem(cvs) {
        this._stage = cvs.getContext('2d');
        this._engine = new Engine(this._stage, {
            particleCreate: this.createParticle,
            particleUpdate: this.updateParticle,
            onParticleAdvance: this.advanceParticle
        });
        this._engine.capacity = 128;
        // updateBlendMode();
    }
    SimpleSystem.prototype.createParticle = function () {
        return new Particle(this._stage);
    };
    SimpleSystem.prototype.updateParticle = function (particle) {
        particle.x = this.emitterX;
        particle.y = this.emitterY;
        particle.currentTime = 0;
        particle.totalTime = 1;
        particle.color = Math.round(Math.random() * 0xffffff);
    };
    SimpleSystem.prototype.advanceParticle = function (particle, passedTime) {
        particle.y += passedTime * 250;
        particle.alpha = 1.0 - particle.currentTime / particle.totalTime;
        particle.currentTime += passedTime;
    };
    SimpleSystem.prototype.start = function (duration) {
        if (duration === void 0) { duration = Number.MAX_VALUE; }
        this._engine.start(duration);
    };
    SimpleSystem.prototype.stop = function (clearParticles) {
        if (clearParticles === void 0) { clearParticles = false; }
        this._engine.stop(clearParticles);
    };
    SimpleSystem.prototype.clear = function () {
        this._engine.clear();
    };
    Object.defineProperty(SimpleSystem.prototype, "emitterX", {
        get: function () { return this._engine.emitterX; },
        set: function (value) { this._engine.emitterX = value; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SimpleSystem.prototype, "emitterY", {
        get: function () { return this._engine.emitterY; },
        set: function (value) { this._engine.emitterY = value; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SimpleSystem.prototype, "engine", {
        get: function () { return this._engine; },
        enumerable: false,
        configurable: true
    });
    return SimpleSystem;
}());

var PDParticle = /** @class */ (function (_super) {
    __extends(PDParticle, _super);
    function PDParticle(stage, texture) {
        return _super.call(this, stage, texture) || this;
    }
    return PDParticle;
}(Particle));

var CustomSystem = /** @class */ (function () {
    function CustomSystem(cvs, config) {
        this._stage = cvs.getContext('2d');
        this.parseConfig(config);
        this._engine = new Engine(this._stage, {
            particleCreate: this.createParticle.bind(this),
            particleUpdate: this.updateParticle.bind(this),
            onParticleAdvance: this.advanceParticle.bind(this)
        });
        this.capacity = parseInt(config.capacity);
        this.updateEmissionRate();
    }
    CustomSystem.prototype.createParticle = function () {
        return new PDParticle(this._stage);
    };
    CustomSystem.prototype.updateParticle = function (aParticle) {
        var particle = aParticle;
        // for performance reasons, the random variances are calculated inline instead
        // of calling a function
        var lifespan = this._lifespan + this._lifespanVariance * (Math.random() * 2.0 - 1.0);
        var textureWidth = 16;
        particle.currentTime = 0.0;
        particle.totalTime = lifespan > 0.0 ? lifespan : 0.0;
        if (lifespan <= 0.0)
            return;
        var emitterX = this.emitterX;
        var emitterY = this.emitterY;
        particle.x = emitterX + this._emitterXVariance * (Math.random() * 2.0 - 1.0);
        particle.y = emitterY + this._emitterYVariance * (Math.random() * 2.0 - 1.0);
        particle.startX = emitterX;
        particle.startY = emitterY;
        var angle = this._emitAngle + this._emitAngleVariance * (Math.random() * 2.0 - 1.0);
        var speed = this._speed + this._speedVariance * (Math.random() * 2.0 - 1.0);
        particle.velocityX = speed * Math.cos(angle);
        particle.velocityY = speed * Math.sin(angle);
        var startRadius = this._maxRadius + this._maxRadiusVariance * (Math.random() * 2.0 - 1.0);
        var endRadius = this._minRadius + this._minRadiusVariance * (Math.random() * 2.0 - 1.0);
        particle.emitRadius = startRadius;
        particle.emitRadiusDelta = (endRadius - startRadius) / lifespan;
        particle.emitRotation = this._emitAngle + this._emitAngleVariance * (Math.random() * 2.0 - 1.0);
        particle.emitRotationDelta = this._rotatePerSecond + this._rotatePerSecondVariance * (Math.random() * 2.0 - 1.0);
        particle.radialAcceleration = this._radialAcceleration + this._radialAccelerationVariance * (Math.random() * 2.0 - 1.0);
        particle.tangentialAcceleration = this._tangentialAcceleration + this._tangentialAccelerationVariance * (Math.random() * 2.0 - 1.0);
        var startSize = this._startSize + this._startSizeVariance * (Math.random() * 2.0 - 1.0);
        var endSize = this._endSize + this._endSizeVariance * (Math.random() * 2.0 - 1.0);
        if (startSize < 0.1)
            startSize = 0.1;
        if (endSize < 0.1)
            endSize = 0.1;
        particle.scale = startSize / textureWidth;
        particle.scaleDelta = ((endSize - startSize) / lifespan) / textureWidth;
        // colors
        var startColor = particle.colorRgba;
        var colorDelta = particle.colorRgbaDelta;
        startColor.red = this._startColor.red;
        startColor.green = this._startColor.green;
        startColor.blue = this._startColor.blue;
        startColor.alpha = this._startColor.alpha;
        if (this._startColorVariance.red != 0)
            startColor.red += this._startColorVariance.red * (Math.random() * 2.0 - 1.0);
        if (this._startColorVariance.green != 0)
            startColor.green += this._startColorVariance.green * (Math.random() * 2.0 - 1.0);
        if (this._startColorVariance.blue != 0)
            startColor.blue += this._startColorVariance.blue * (Math.random() * 2.0 - 1.0);
        if (this._startColorVariance.alpha != 0)
            startColor.alpha += this._startColorVariance.alpha * (Math.random() * 2.0 - 1.0);
        var endColorRed = this._endColor.red;
        var endColorGreen = this._endColor.green;
        var endColorBlue = this._endColor.blue;
        var endColorAlpha = this._endColor.alpha;
        if (this._endColorVariance.red != 0)
            endColorRed += this._endColorVariance.red * (Math.random() * 2.0 - 1.0);
        if (this._endColorVariance.green != 0)
            endColorGreen += this._endColorVariance.green * (Math.random() * 2.0 - 1.0);
        if (this._endColorVariance.blue != 0)
            endColorBlue += this._endColorVariance.blue * (Math.random() * 2.0 - 1.0);
        if (this._endColorVariance.alpha != 0)
            endColorAlpha += this._endColorVariance.alpha * (Math.random() * 2.0 - 1.0);
        colorDelta.red = (endColorRed - startColor.red) / lifespan;
        colorDelta.green = (endColorGreen - startColor.green) / lifespan;
        colorDelta.blue = (endColorBlue - startColor.blue) / lifespan;
        colorDelta.alpha = (endColorAlpha - startColor.alpha) / lifespan;
        // rotation
        var startRotation = this._startRotation + this._startRotationVariance * (Math.random() * 2.0 - 1.0);
        var endRotation = this._endRotation + this._endRotationVariance * (Math.random() * 2.0 - 1.0);
        particle.rotation = startRotation;
        particle.rotationDelta = (endRotation - startRotation) / lifespan;
    };
    CustomSystem.prototype.advanceParticle = function (aParticle, passedTime) {
        var particle = aParticle;
        var restTime = particle.totalTime - particle.currentTime;
        passedTime = restTime > passedTime ? passedTime : restTime;
        particle.currentTime += passedTime;
        if (this._emitterType == CustomSystem.EMITTER_TYPE_RADIAL) {
            particle.emitRotation += particle.emitRotationDelta * passedTime;
            particle.emitRadius += particle.emitRadiusDelta * passedTime;
            particle.x = this.emitterX - Math.cos(particle.emitRotation) * particle.emitRadius;
            particle.y = this.emitterY - Math.sin(particle.emitRotation) * particle.emitRadius;
        }
        else {
            var distanceX = particle.x - particle.startX;
            var distanceY = particle.y - particle.startY;
            var distanceScalar = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
            if (distanceScalar < 0.01)
                distanceScalar = 0.01;
            var radialX = distanceX / distanceScalar;
            var radialY = distanceY / distanceScalar;
            var tangentialX = radialX;
            var tangentialY = radialY;
            radialX *= particle.radialAcceleration;
            radialY *= particle.radialAcceleration;
            var newY = tangentialX;
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
    };
    CustomSystem.prototype.updateEmissionRate = function () {
        this._engine.emissionRate = (this.capacity - 1) / this._lifespan;
    };
    CustomSystem.prototype.parseConfig = function (config) {
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
        function deg2rad(element) {
            return Math.PI * element / 180;
        }
        function getColor(element) {
            return new ColorRgba(parseFloat(element.red), parseFloat(element.green), parseFloat(element.blue), parseFloat(element.alpha));
        }
        function getBlendFunc(value) {
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
    };
    CustomSystem.prototype.start = function (duration) {
        if (duration === void 0) { duration = Number.MAX_VALUE; }
        this._engine.start(duration);
    };
    CustomSystem.prototype.stop = function (clearParticles) {
        if (clearParticles === void 0) { clearParticles = false; }
        this._engine.stop(clearParticles);
    };
    CustomSystem.prototype.clear = function () {
        this._engine.clear();
    };
    Object.defineProperty(CustomSystem.prototype, "emitterX", {
        get: function () { return this._engine.emitterX; },
        set: function (value) { this._engine.emitterX = value; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CustomSystem.prototype, "emitterY", {
        get: function () { return this._engine.emitterY; },
        set: function (value) { this._engine.emitterY = value; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CustomSystem.prototype, "engine", {
        get: function () { return this._engine; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CustomSystem.prototype, "emitterType", {
        get: function () { return this._emitterType; },
        set: function (value) { this._emitterType = value; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CustomSystem.prototype, "emitterXVariance", {
        get: function () { return this._emitterXVariance; },
        set: function (value) { this._emitterXVariance = value; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CustomSystem.prototype, "emitterYVariance", {
        get: function () { return this._emitterYVariance; },
        set: function (value) { this._emitterYVariance = value; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CustomSystem.prototype, "defaultDuration", {
        get: function () { return this._defaultDuration; },
        set: function (value) {
            this._defaultDuration = value < 0 ? Number.MAX_VALUE : value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CustomSystem.prototype, "capacity", {
        get: function () { return this._engine.capacity; },
        set: function (value) {
            this._engine.capacity = value;
            this.updateEmissionRate();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CustomSystem.prototype, "lifespan", {
        get: function () { return this._lifespan; },
        set: function (value) {
            this._lifespan = Math.max(0.01, value);
            this.updateEmissionRate();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CustomSystem.prototype, "lifespanVariance", {
        get: function () { return this._lifespanVariance; },
        set: function (value) { this._lifespanVariance = value; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CustomSystem.prototype, "startSize", {
        get: function () { return this._startSize; },
        set: function (value) { this._startSize = value; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CustomSystem.prototype, "startSizeVariance", {
        get: function () { return this._startSizeVariance; },
        set: function (value) { this._startSizeVariance = value; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CustomSystem.prototype, "endSize", {
        get: function () { return this._endSize; },
        set: function (value) { this._endSize = value; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CustomSystem.prototype, "endSizeVariance", {
        get: function () { return this._endSizeVariance; },
        set: function (value) { this._endSizeVariance = value; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CustomSystem.prototype, "emitAngle", {
        get: function () { return this._emitAngle; },
        set: function (value) { this._emitAngle = value; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CustomSystem.prototype, "emitAngleVariance", {
        get: function () { return this._emitAngleVariance; },
        set: function (value) { this._emitAngleVariance = value; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CustomSystem.prototype, "startRotation", {
        get: function () { return this._startRotation; },
        set: function (value) { this._startRotation = value; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CustomSystem.prototype, "startRotationVariance", {
        get: function () { return this._startRotationVariance; },
        set: function (value) { this._startRotationVariance = value; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CustomSystem.prototype, "endRotation", {
        get: function () { return this._endRotation; },
        set: function (value) { this._endRotation = value; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CustomSystem.prototype, "endRotationVariance", {
        get: function () { return this._endRotationVariance; },
        set: function (value) { this._endRotationVariance = value; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CustomSystem.prototype, "speed", {
        get: function () { return this._speed; },
        set: function (value) { this._speed = value; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CustomSystem.prototype, "speedVariance", {
        get: function () { return this._speedVariance; },
        set: function (value) { this._speedVariance = value; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CustomSystem.prototype, "gravityX", {
        get: function () { return this._gravityX; },
        set: function (value) { this._gravityX = value; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CustomSystem.prototype, "gravityY", {
        get: function () { return this._gravityY; },
        set: function (value) { this._gravityY = value; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CustomSystem.prototype, "radialAcceleration", {
        get: function () { return this._radialAcceleration; },
        set: function (value) { this._radialAcceleration = value; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CustomSystem.prototype, "radialAccelerationVariance", {
        get: function () { return this._radialAccelerationVariance; },
        set: function (value) { this._radialAccelerationVariance = value; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CustomSystem.prototype, "tangentialAcceleration", {
        get: function () { return this._tangentialAcceleration; },
        set: function (value) { this._tangentialAcceleration = value; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CustomSystem.prototype, "tangentialAccelerationVariance", {
        get: function () { return this._tangentialAccelerationVariance; },
        set: function (value) { this._tangentialAccelerationVariance = value; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CustomSystem.prototype, "maxRadius", {
        get: function () { return this._maxRadius; },
        set: function (value) { this._maxRadius = value; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CustomSystem.prototype, "maxRadiusVariance", {
        get: function () { return this._maxRadiusVariance; },
        set: function (value) { this._maxRadiusVariance = value; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CustomSystem.prototype, "minRadius", {
        get: function () { return this._minRadius; },
        set: function (value) { this._minRadius = value; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CustomSystem.prototype, "minRadiusVariance", {
        get: function () { return this._minRadiusVariance; },
        set: function (value) { this._minRadiusVariance = value; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CustomSystem.prototype, "rotatePerSecond", {
        get: function () { return this._rotatePerSecond; },
        set: function (value) { this._rotatePerSecond = value; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CustomSystem.prototype, "rotatePerSecondVariance", {
        get: function () { return this._rotatePerSecondVariance; },
        set: function (value) { this._rotatePerSecondVariance = value; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CustomSystem.prototype, "startColor", {
        get: function () { return this._startColor; },
        set: function (value) { this._startColor = value; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CustomSystem.prototype, "startColorVariance", {
        get: function () { return this._startColorVariance; },
        set: function (value) { this._startColorVariance = value; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CustomSystem.prototype, "endColor", {
        get: function () { return this._endColor; },
        set: function (value) { this._endColor = value; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CustomSystem.prototype, "endColorVariance", {
        get: function () { return this._endColorVariance; },
        set: function (value) { this._endColorVariance = value; },
        enumerable: false,
        configurable: true
    });
    CustomSystem.EMITTER_TYPE_GRAVITY = 0;
    CustomSystem.EMITTER_TYPE_RADIAL = 1;
    return CustomSystem;
}());

var index = {
  SimpleSystem: SimpleSystem,
  CustomSystem: CustomSystem
};

export default index;
