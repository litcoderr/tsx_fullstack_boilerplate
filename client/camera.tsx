import React from "react";
import {useFrame} from "@react-three/fiber";

function CameraController() {

    useFrame(({clock, camera})=>{
        camera.position.z += 0.005;
    });
    return <></>;
}

export default CameraController;