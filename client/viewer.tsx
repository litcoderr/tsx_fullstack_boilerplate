import React, { useEffect, useRef } from "react";
import * as THREE from "three";


class ViewEngine {
    width: number;
    height: number;
    renderer: THREE.WebGLRenderer;
    // TODO add ref

    constructor() {
        this.width = window.innerWidth-1;
        this.height = window.innerHeight-1;
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(this.width, this.height);
    }

    animate = () => {
        console.log("Hello from view engine");
    }
}

const viewEngine = new ViewEngine();

function Viewer() {
    const div_ref = useRef<HTMLDivElement>(null!);

    useEffect(()=>{
        viewEngine.animate();
    }); 

    return (
        <div
            ref={div_ref}
            style={{width:'100%', height:'100%'}}>
        </div>
    )
}

export default Viewer;