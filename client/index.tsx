import React, {useRef} from "react";
import ReactDOM from "react-dom";
import {Canvas, useThree} from "@react-three/fiber";

import "./style.css";
import Globe from "./componenets/globe";
import CameraController from "./camera";

type MainProps = {
    loginState: boolean
}

function MainComponent(props: MainProps) {
    return (
        <Canvas>
            <CameraController></CameraController>
            <ambientLight></ambientLight>
            <pointLight position={[10, 5, 0]}></pointLight>
            <Globe position={[0, 0, 0]}></Globe>
        </Canvas>
    )
}

ReactDOM.render(<MainComponent loginState={true}></MainComponent>, document.getElementById('root'));
