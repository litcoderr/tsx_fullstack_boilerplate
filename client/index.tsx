import React from "react";
import ReactDOM from "react-dom";
import {Canvas} from "@react-three/fiber";

import "./style.css";
import Box from "./box";

type MainProps = {
    loginState: boolean
}

function MainComponent(props: MainProps) {
    return (
        <Canvas>
            <ambientLight></ambientLight>
            <Box position={[0, 0, 0]}></Box>
        </Canvas>
    )
}

ReactDOM.render(<MainComponent loginState={true}></MainComponent>, document.getElementById('root'));

