import React, {ReactElement, useState} from "react";
import styles from "./Panel.module.css";
import {Button, Col, Container, Row} from "react-bootstrap";
import {RotatingCube} from "../RotatingCube/RotatingCube";
import {ThreeLines} from "../ThreeLines/ThreeLines";
import {OrbitControlsReactElement} from "../OrbitControl/OrbitControl";

const map = new Map<string, JSX.Element>([
    ["RotatingCube", <RotatingCube/>],
    ["ThreeLines", <ThreeLines/>],
    ["OrbitControl", <OrbitControlsReactElement/>],
]);

function Panel(): ReactElement<HTMLFormElement> {

    const [selection, setSelection] = useState<string>("RotatingCube");

    let selectedComponent = map.get(selection);

    const buttons = Array.from(map.keys()).map(k => <Button onClick={() => setSelection(k)} key={k}>{k}</Button>);

    return (
        <div id="d3-catalog-panel" className={styles.panel}>
            <Container>
                <Row xs={6}>
                    <Col xs={12}>
                        {selection}
                    </Col>
                </Row>
                <Row>
                    <Col xs={2}>
                        <Row>
                            {buttons}
                        </Row>
                    </Col>
                    <Col className={styles.columnRight}>
                        {selectedComponent}
                    </Col>
                </Row>
            </Container>
        </div>
    );

}

export default Panel
