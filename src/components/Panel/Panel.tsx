import React, {ReactElement, useState} from "react";
import styles from "./Panel.module.css";
import {Col, Container, Row} from "react-bootstrap";
import {RotatingCube} from "../RotatingCube/RotatingCube";
import {ThreeLines} from "../ThreeLines/ThreeLines";
import {OrbitControlsReactElement} from "../OrbitControl/OrbitControl";
import {InteractiveScene} from "../InteractiveScene/InteractiveScene";
import {InteractiveCubes} from "../InteractiveCubes/InteractiveCubes";
import Config from "../Config/Config";
import {MyScene} from "../MyScene/MyScene";
import {HelloWorldCube} from "../CubeWithText/HelloWorldCube";
import {TextReactElement} from "../Text/Text";
import {Dodecahedron} from "../Dodecahedron/Dodecahedron";

const map = new Map<string, React.JSX.Element>([
    ["MyScene", <MyScene key={"MyScene"}/>],
    ["RotatingCube", <RotatingCube key={"RotatingCube"}/>],
    ["ThreeLines", <ThreeLines key={"ThreeLines"}/>],
    ["OrbitControl", <OrbitControlsReactElement key={"OrbitControlsReactElement"}/>],
    ["InteractiveScene", <InteractiveScene key={"InteractiveScene"}/>],
    ["InteractiveCubes", <InteractiveCubes key={"InteractiveCubes"}/>],
    ["Text", <TextReactElement key={"Text"}/>],
    ["HelloWorldCube", <HelloWorldCube key={"HelloWorldCube"}/>],
    ["Dodecahedron", <Dodecahedron key={"Dodecahedron"}/>],
]);

function Panel(): ReactElement<HTMLFormElement> {

    const [selectedScene, setSelectedScene] = useState<string>("Dodecahedron");

    let scene = map.get(selectedScene);

    return (
        <div id="panel" className={styles.panel}>
            <Container>
                <Row>
                    <Col xs={1}>
                        <Config
                            scenes={Array.from(map.keys())}
                            onChangeSelectedScene={(s) => setSelectedScene(s)}
                        />
                    </Col>
                </Row>
                <Row xs={6}>
                    <Col xs={12}>
                        {selectedScene}
                    </Col>
                </Row>
                <Row>
                    <Col className={styles.columnRight}>
                        {scene}
                    </Col>
                </Row>
            </Container>
        </div>
    );

}

export default Panel
