import React, {ReactElement, useState} from "react";
import {Button, Col, Container, Offcanvas, Row} from "react-bootstrap";

interface D3CatalogTreeConfigProps {
    onChangeSelectedScene: (newScene: string) => void,
    scenes: string[];
}

const Config = (props: D3CatalogTreeConfigProps): ReactElement<HTMLFormElement> => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const toggleShow = () => setShow((s) => !s);
    const sceneButtons = props.scenes.map(scene =>
        <Row key={scene}>
            <Button variant="primary" onClick={() => props.onChangeSelectedScene(scene)}>{scene}</Button>
        </Row>
    )

    return (
        <>
            <Button variant="primary" onClick={toggleShow} className="me-2">
                Config
            </Button>
            <Offcanvas show={show} onHide={handleClose} scroll={true} backdrop={true}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Config</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Container>
                        <Row>
                            <Col>
                                {sceneButtons}
                            </Col>
                        </Row>
                    </Container>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );

}

export default Config
