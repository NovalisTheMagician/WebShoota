class StartUp {

    scene: THREE.Scene;
    camera: THREE.Camera;
    renderer: THREE.Renderer;
    geometry: THREE.BoxGeometry;
    material: THREE.Material;
    cube: THREE.Mesh;

    public static main(): number {
        
        let game = new StartUp();
        game.init();
        game.animate();

        return 0;
    }

    public init(): void {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);

        this.geometry = new THREE.BoxGeometry(1, 1, 1);
        this.material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        this.cube = new THREE.Mesh(this.geometry, this.material);
        this.scene.add(this.cube);

        this.camera.position.z = 5;
    }

    public animate = () => {
        requestAnimationFrame(this.animate);

        this.cube.rotation.x += 0.1;
        this.cube.rotation.y += 0.1;

        this.renderer.render(this.scene, this.camera);
    }
}

StartUp.main();