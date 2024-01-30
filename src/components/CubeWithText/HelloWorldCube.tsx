import React, {ReactElement, useEffect, useRef} from 'react';
import * as THREE from 'three';
import {FontLoader} from "three/examples/jsm/loaders/FontLoader";
import {TextGeometry} from "three/examples/jsm/geometries/TextGeometry";

function render(refContainer: any) {
    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // Renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
    refContainer.current?.appendChild(renderer.domElement);

    // Cube
    const cubeGeometry = new THREE.BoxGeometry();
    const cubeMaterials = [
        new THREE.MeshBasicMaterial({color: 0x00ff00}),
        new THREE.MeshBasicMaterial({color: 0x0000ff}),
        new THREE.MeshBasicMaterial({color: 0xff0000}),
        new THREE.MeshBasicMaterial({color: 0xffff00}),
        new THREE.MeshBasicMaterial({color: 0xff00ff}),
        new THREE.MeshBasicMaterial({color: 0x00ffff}),
    ];

    const cube = new THREE.Mesh(cubeGeometry, cubeMaterials);
    scene.add(cube);

    // Text
    const fontLoader = new FontLoader();
    fontLoader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', (font: any) => {
        const textMaterial = new THREE.MeshBasicMaterial({color: 0xffffff});
        const textGeometry = new TextGeometry('Hello\nWorld', {
            font: font,
            size: 0.2,
            height: 0.01,
        });

        const textMesh = new THREE.Mesh(textGeometry, textMaterial);
        textMesh.position.set(-0.5, 0.2, 0.5); // Adjust the position of the text
        // textMesh.rotation.set(0, Math.PI / 4, 0); // Rotate text to match one face of the cube
        cube.add(textMesh);
    });

    // Animation
    const animate = () => {
        requestAnimationFrame(animate);
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderer.render(scene, camera);
    };

    animate();

}

export function HelloWorldCube(): ReactElement<HTMLFormElement> {
    const refContainer = useRef(null);
    useEffect(() => {
        render(refContainer);
    }, [])
    return (<div ref={refContainer}></div>)
}

