class Game {

    timer: Timer;
    renderer: Renderer;
    soundSystem: SoundSystem;

    accumulator: number;

    public constructor() {
        this.timer = new Timer();
        this.renderer = new Renderer();

        this.accumulator = 0.0;
    }

    public init(): void {
        
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
        }

        // render the shit out of the browser

        this.renderer.flip();
    }
}