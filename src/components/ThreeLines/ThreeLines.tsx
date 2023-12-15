import * as THREE from 'three';
import {ReactElement, useEffect, useRef} from "react";

function render(refContainer: any) {
    console.log("ThreeLines.render()");
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
    const renderer = new THREE.WebGLRenderer();

    renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
    refContainer.current?.appendChild(renderer.domElement);

    camera.position.set(0, 0, 100);
    camera.lookAt(0, 0, 0);

    const material = new THREE.LineBasicMaterial({color: 0x0000ff});

    const points = [];
    points.push(new THREE.Vector3(-10, 0, 0));
    points.push(new THREE.Vector3(0, 10, 0));
    points.push(new THREE.Vector3(10, 0, 0));
    const geometry = new THREE.BufferGeometry().setFromPoints(points);

    const line = new THREE.Line(geometry, material);

    scene.add(line);
    renderer.render(scene, camera);
}

export function ThreeLines(): ReactElement<HTMLFormElement> {
    const refContainer = useRef(null);
    useEffect(() => {
        render(refContainer);
    }, [])
    return (<div ref={refContainer}></div>)
}
