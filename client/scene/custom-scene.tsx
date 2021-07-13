import * as THREE from "three";


abstract class CustomScene {
    /**
     * Scene that gets rendered in this.animate()
     */
    scene: THREE.Scene;

    /**
     * Camera that is used to render in this.animate()
     */
    camera: THREE.Camera;

    constructor() {
        // init scene and camera
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75,
                                                  window.innerWidth/window.innerHeight,
                                                  0.1,
                                                  1000);
    }

    /**
     * Called inside Viewer's animate() function
     */
    abstract update(): void;
}

export default CustomScene;