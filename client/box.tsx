import React, {useRef, useState} from "react";
import {Canvas, useFrame, MeshProps} from "@react-three/fiber";

type BoxProps = {
    position: number[],
}

function Box(props: BoxProps) {
    const box: React.MutableRefObject<MeshProps> = useRef();
    const [scale, setScale] = useState(0.1);

    useFrame((state, delta) => {
        setScale(scale + 0.01);
    });

    return (
        <mesh
            position={props.position}
            ref={box}
            scale={scale}>
            <boxGeometry args={[1, 1, 1]}/>
            <meshStandardMaterial color={'hotpink'}/>
        </mesh>
    )
}

export default Box;