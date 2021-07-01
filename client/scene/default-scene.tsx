import * as THREE from "three";
import CustomScene from "./custom-scene";


class DefaultScene extends CustomScene {
    geom: THREE.BoxGeometry;
    material: THREE.MeshBasicMaterial;
    cube: THREE.Mesh;

    constructor() {
        super();

        // add cube
        this.geom = new THREE.BoxGeometry(1, 1, 10);
        this.material = new THREE.MeshBasicMaterial({color: 0x00ff00});
        this.cube = new THREE.Mesh(this.geom, this.material);
        this.scene.add(this.cube);

        this.camera.position.z = 5;
        console.log(this);
    }

    update = () => {
    }
}

export default DefaultScene;