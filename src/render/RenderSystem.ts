/// <reference path="RenderProperty.ts" />
/// <reference path="../System.ts" />

namespace WebGame {
    export class Renderer implements ISystem {

        private entites: Map<number, RenderProp>;

        private scene: THREE.Scene;
        private camera: THREE.Camera;
        private renderer: THREE.Renderer;

        public constructor() {
            this.entites = new Map<number, RenderProp>();

            this.scene = new THREE.Scene();
            this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            this.renderer = new THREE.WebGLRenderer();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            document.body.appendChild(this.renderer.domElement);

            // test
            this.camera.position.z = 5;
        }

        public addEntity(id: number, entity: IEntity): void {
            if(!entity.renderProp) {
                return;
            }
            let renderProp = entity.renderProp;
            this.entites.set(id, renderProp);
            this.scene.add(renderProp.mesh);
        }

        public removeEntity(id: number): void {
            let renderProp = this.entites.get(id);
            this.scene.remove(renderProp.mesh);
            this.entites.delete(id);
        }

        public render(): void {
            this.renderer.render(this.scene, this.camera);
        }
    }
}
