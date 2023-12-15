import * as THREE from 'three';
import {ReactElement, useEffect, useRef} from "react";

function render(refContainer: any) {
    console.log("RotatingCube.render()");
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();

    renderer.setSize(window.innerWidth, window.innerHeight);
    refContainer.current?.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({color: 0x00ff00});

    const cube = new THREE.Mesh(geometry, material);

    scene.add(cube);

    camera.position.z = 5;

    const animate = function () {
        requestAnimationFrame(animate);
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderer.render(scene, camera);
    };
    animate();
}

export function RotatingCube(): ReactElement<HTMLFormElement> {
    const refContainer = useRef(null);
    useEffect(() => {
        render(refContainer);
    }, [])
    return (<div ref={refContainer}></div>)
}