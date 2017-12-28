/// <reference path="render/RenderSystem.ts" />
/// <reference path="render/RenderProperty.ts" />

/// <reference path="entities/Entity.ts" />

/// <reference path="input/InputSystem.ts" />

/// <reference path="time/TimeSystem.ts" />

/// <reference path="physics/PhysicsSystem.ts" />

/// <reference path="sound/SoundSystem.ts" />

/// <reference path="Config.ts" />
/// <reference path="World.ts" />
namespace WebGame {
    export class Game {

        private timer: Timer;
        private renderer: Renderer;
        private soundSystem: SoundSystem;
        private inputSystem: InputSystem;
        private physicsSystem: PhysicsSystem;

        private world: World;

        private accumulator: number;

        public constructor() {
            this.timer = new Timer();
            this.renderer = new Renderer();
            this.soundSystem = new SoundSystem();
            this.inputSystem = new InputSystem();
            this.physicsSystem = new PhysicsSystem();

            this.world = new World();

            this.accumulator = 0.0;
        }

        public init(): void {
            this.world.register(this.renderer);

            let geometry = new THREE.BoxGeometry(1, 1, 1);
            let material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
            let entity = new IEntity();
            entity.renderProp = new RenderProp();
            entity.renderProp.mesh = new THREE.Mesh(geometry, material);

            this.world.addEntity(entity);
        }

        public loop(): void {
            this.timer.update();

            let dt = this.timer.getDeltaTime();
            let targetFT = Config.TARGET_FRAMETIME;

            this.accumulator += dt;

            // check input and react to it (variable timestep)


            while(this.accumulator >= targetFT) {
                this.accumulator -= targetFT;
                // do physics and stuff (fixed timestep)
                this.physicsSystem.update(targetFT);
            }

            // render the shit out of the browser
            this.renderer.render();
        }
    }
}
