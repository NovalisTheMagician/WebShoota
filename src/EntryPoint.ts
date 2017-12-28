/// <reference path="Game.ts" />
let game = new WebGame.Game();
game.init();
animate();

function animate() {
    requestAnimationFrame(animate);
    game.loop();
}
