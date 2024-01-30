import * as THREE from 'three';
import {ReactElement, useEffect, useRef} from "react";
import {FontLoader} from "three/examples/jsm/loaders/FontLoader";
import {TextGeometry} from "three/examples/jsm/geometries/TextGeometry";
import HelvetikerFont from "three/examples/fonts/helvetiker_regular.typeface.json";

function render(refContainer: any) {

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // Renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
    refContainer.current?.appendChild(renderer.domElement);

    const loader = new FontLoader();
    const font = loader.parse(HelvetikerFont);
    const textGeometry = new TextGeometry('Hello World', {
        font: font,
        size: 0.5,
        height: 0.1,
    });
    const textMaterial = new THREE.MeshBasicMaterial({color: 0xffffff});
    const textMesh = new THREE.Mesh(textGeometry, textMaterial);
    textMesh.position.set(-1, -1, -1); // Adjust the position of the text
    scene.add(textMesh);

    const animate = () => {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    };

    animate();

}

export function TextReactElement(): ReactElement<HTMLFormElement> {
    const refContainer = useRef(null);
    useEffect(() => {
        render(refContainer);
    }, [])
    return (<div ref={refContainer}></div>)
}
