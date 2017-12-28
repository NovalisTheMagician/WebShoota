class Renderer {

    scene: THREE.Scene;
    camera: THREE.Camera;
    renderer: THREE.Renderer;

    public constructor() {

    }

    public flip(): void {
        this.renderer.render(this.scene, this.camera);
    }
}