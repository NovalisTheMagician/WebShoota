class Config {
}
Config.TARGET_FPS = 60;
Config.TARGET_FRAMETIME = 1.0 / Config.TARGET_FPS;
Config.APP_NAME = "WebShoota";
class StartUp {
    constructor() {
        this.animate = () => {
            requestAnimationFrame(this.animate);
            this.game.loop();
        };
        this.game = new Game();
        this.game.init();
    }
    static main() {
        let instance = new StartUp();
        instance.animate();
        return 0;
    }
}
StartUp.main();
class Game {
    constructor() {
        this.timer = new Timer();
        this.renderer = new Renderer();
        this.accumulator = 0.0;
    }
    init() {
    }
    loop() {
        this.timer.update();
        let dt = this.timer.getDeltaTime();
        let targetFT = Config.TARGET_FRAMETIME;
        this.accumulator += dt;
        // check input and react to it (variable timestep)
        while (this.accumulator >= targetFT) {
            this.accumulator -= targetFT;
            // do physics and stuff (fixed timestep)
        }
        // render the shit out of the browser
        this.renderer.flip();
    }
}
class World {
    constructor() {
    }
    addEntity(entity) {
        return 0;
    }
}
class IEntity {
}
class PhysicsSystem {
}
class Renderer {
    constructor() {
    }
    flip() {
        this.renderer.render(this.scene, this.camera);
    }
}
class SoundSystem {
}
class Timer {
    constructor() {
        this.startTime = window.performance.now();
        this.currentTime = this.startTime;
        this.lastTime = this.currentTime;
        this.totalTime = 0;
        this.deltaTime = 0;
    }
    update() {
        this.currentTime = window.performance.now();
        this.deltaTime = this.currentTime - this.lastTime;
        this.lastTime = this.currentTime;
        this.totalTime = this.currentTime - this.startTime;
    }
    getDeltaTime() {
        return this.deltaTime / 1000;
    }
    getTotalTime() {
        return this.totalTime / 1000;
    }
}
