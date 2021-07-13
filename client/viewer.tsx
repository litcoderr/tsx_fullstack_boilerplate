import React, { useEffect, useRef } from "react";
import * as THREE from "three";

import CustomScene from "./scene/custom-scene";
import DefaultScene from "./scene/default-scene";


class ViewEngine {
    width: number;
    height: number;
    renderer: THREE.WebGLRenderer;
    scene: CustomScene;

    constructor() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(this.width, this.height);

        // init scene
        // TODO need pipeline to route different scenes
        this.scene = new DefaultScene();
    }

    animate = () => {
        requestAnimationFrame(this.animate);
        // update
        this.scene.update();

        this.renderer.render(this.scene.scene, this.scene.camera);
    }
}

const viewEngine = new ViewEngine();

function Viewer() {
    const div = useRef<HTMLDivElement>(null!);

    useEffect(()=>{
        // hook renderer to div
        div.current.appendChild(viewEngine.renderer.domElement);

        // start animation
        viewEngine.animate();
    }); 

    return (
        <div
            ref={div}
            style={{width:'100%', height:'100%'}}>
        </div>
    )
}

export default Viewer;
export {ViewEngine};