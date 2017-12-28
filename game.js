var WebGame;
(function (WebGame) {
    class Config {
    }
    Config.TARGET_FPS = 60;
    Config.TARGET_FRAMETIME = 1.0 / Config.TARGET_FPS;
    Config.APP_NAME = "WebShoota";
    WebGame.Config = Config;
})(WebGame || (WebGame = {}));
var WebGame;
(function (WebGame) {
    class RenderProp {
    }
    WebGame.RenderProp = RenderProp;
})(WebGame || (WebGame = {}));
/// <reference path="../render/RenderProperty.ts" />
var WebGame;
(function (WebGame) {
    class IEntity {
    }
    WebGame.IEntity = IEntity;
})(WebGame || (WebGame = {}));
/// <reference path="entities/Entity.ts" />
/// <reference path="RenderProperty.ts" />
/// <reference path="../System.ts" />
var WebGame;
(function (WebGame) {
    class Renderer {
        constructor() {
            this.entites = new Map();
            this.scene = new THREE.Scene();
            this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            this.renderer = new THREE.WebGLRenderer();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            document.body.appendChild(this.renderer.domElement);
            // test
            this.camera.position.z = 5;
        }
        addEntity(id, entity) {
            if (!entity.renderProp) {
                console.log("not added!");
                return;
            }
            console.log("added!");
            let renderProp = entity.renderProp;
            this.entites.set(id, renderProp);
            this.scene.add(renderProp.mesh);
        }
        removeEntity(id) {
            let renderProp = this.entites.get(id);
            this.scene.remove(renderProp.mesh);
            this.entites.delete(id);
        }
        render() {
            this.renderer.render(this.scene, this.camera);
        }
    }
    WebGame.Renderer = Renderer;
})(WebGame || (WebGame = {}));
var WebGame;
(function (WebGame) {
    class InputSystem {
    }
    WebGame.InputSystem = InputSystem;
})(WebGame || (WebGame = {}));
var WebGame;
(function (WebGame) {
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
    WebGame.Timer = Timer;
})(WebGame || (WebGame = {}));
/// <reference path="../System.ts" />
var WebGame;
(function (WebGame) {
    class PhysicsSystem {
        constructor() {
        }
        addEntity(id, entity) {
        }
        removeEntity(id) {
        }
        update(dt) {
        }
    }
    WebGame.PhysicsSystem = PhysicsSystem;
})(WebGame || (WebGame = {}));
class SoundSystem {
}
/// <reference path="render/RenderProperty.ts" />
/// <reference path="System.ts" />
var WebGame;
(function (WebGame) {
    class World {
        constructor() {
            this.entities = new Map();
            this.systems = new Set();
            this.idCounter = 1000;
        }
        register(system) {
            this.systems.add(system);
        }
        unregister(system) {
            this.systems.delete(system);
        }
        addEntity(entity) {
            let reservedId = this.idCounter;
            this.entities.set(reservedId, entity);
            for (let system of this.systems) {
                system.addEntity(reservedId, entity);
            }
            this.idCounter++;
            return reservedId;
        }
        removeEntity(id) {
            let entity = this.entities.get(id);
            for (let system of this.systems) {
                system.addEntity(id, entity);
            }
            this.entities.delete(id);
        }
    }
    WebGame.World = World;
})(WebGame || (WebGame = {}));
/// <reference path="render/RenderSystem.ts" />
/// <reference path="render/RenderProperty.ts" />
/// <reference path="entities/Entity.ts" />
/// <reference path="input/InputSystem.ts" />
/// <reference path="time/TimeSystem.ts" />
/// <reference path="physics/PhysicsSystem.ts" />
/// <reference path="sound/SoundSystem.ts" />
/// <reference path="Config.ts" />
/// <reference path="World.ts" />
var WebGame;
(function (WebGame) {
    class Game {
        constructor() {
            this.timer = new WebGame.Timer();
            this.renderer = new WebGame.Renderer();
            this.soundSystem = new SoundSystem();
            this.inputSystem = new WebGame.InputSystem();
            this.physicsSystem = new WebGame.PhysicsSystem();
            this.world = new WebGame.World();
            this.accumulator = 0.0;
        }
        init() {
            this.world.register(this.renderer);
            let geometry = new THREE.BoxGeometry(1, 1, 1);
            let material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
            let entity = new WebGame.IEntity();
            entity.renderProp = new WebGame.RenderProp();
            entity.renderProp.mesh = new THREE.Mesh(geometry, material);
            this.world.addEntity(entity);
        }
        loop() {
            this.timer.update();
            let dt = this.timer.getDeltaTime();
            let targetFT = WebGame.Config.TARGET_FRAMETIME;
            this.accumulator += dt;
            // check input and react to it (variable timestep)
            while (this.accumulator >= targetFT) {
                this.accumulator -= targetFT;
                // do physics and stuff (fixed timestep)
                this.physicsSystem.update(targetFT);
            }
            // render the shit out of the browser
            this.renderer.render();
        }
    }
    WebGame.Game = Game;
})(WebGame || (WebGame = {}));
/// <reference path="Game.ts" />
let game = new WebGame.Game();
game.init();
animate();
function animate() {
    requestAnimationFrame(animate);
    game.loop();
}
