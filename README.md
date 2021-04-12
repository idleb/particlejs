# particlejs
particlejs粒子系统类提供了一种在Canvas中显示粒子系统的简单方法。例如：添加爆炸、烟雾、雪、火等特效。

particlejs封装了两套系统：
`SimpleSystem`：实现了一个非常简单的粒子运动.
`CustomSystem`：可以通过[编辑器](http://www.http://idleb.cn/examples/particlejs/editor)设计你想要的粒子系统.

# Installation
通过如下`<script>`引入:
`<script src="//dist/particlejs.umd.min.js"></script>`

# Sample Code
``` javascript
    const { CustomSystem } = ParticleJs
    // create particle system
    const ps = new CustomSystem(document.getElementById('cvs'), config)
    ps.emitterX = 250;
    ps.emitterY = 320;

    // start emitting particles
    ps.start()

    // stop emitting particles
    ps.stop()
```