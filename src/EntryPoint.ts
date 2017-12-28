class StartUp {

    game: Game;

    constructor() {
        this.game = new Game();

        this.game.init();
    }

    public animate = () => {
        requestAnimationFrame(this.animate);
        this.game.loop();
    }

    public static main(): number {
        let instance = new StartUp();
        instance.animate();

        return 0;
    }
}

StartUp.main();