import * as THREE from "three";
import React, {useRef, useState, useEffect} from "react";
import {useFrame} from "@react-three/fiber";

function Globe(props: JSX.IntrinsicElements['mesh']) {
    const mesh = useRef<THREE.Mesh>(null!);
    const sphere = useRef<THREE.SphereGeometry>();

    useFrame((state, delta) => {
    });

    useEffect(()=>{
        console.log(mesh.current.geometry);
        console.log(sphere);
    });

    return (
        <mesh
            {...props}
            ref={mesh}
            scale={1}>
            <sphereGeometry
                // radius, widthSegments(number of horizontal segments), heightSegments(number of vertical segments)
                args={[2, 32, 32]}
                ref={sphere}>
            </sphereGeometry>
            <meshBasicMaterial vertexColors={false}/>
        </mesh>
    )
}

export default Globe;