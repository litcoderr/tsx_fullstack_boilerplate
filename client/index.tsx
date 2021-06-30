import React, {useRef} from "react";
import ReactDOM from "react-dom";
import Viewer from "./viewer";

import "./style.css";

type MainProps = {
    loginState: boolean
}

// TODO use plain threejs instead

function MainComponent(props: MainProps) {
    return (
        <Viewer></Viewer>
    )
}

ReactDOM.render(<MainComponent loginState={true}></MainComponent>, document.getElementById('root'));
