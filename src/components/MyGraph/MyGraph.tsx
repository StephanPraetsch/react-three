import * as THREE from 'three';
import {ReactElement, useEffect, useRef} from "react";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

function render(refContainer: any) {

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
    refContainer.current?.appendChild(renderer.domElement);

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    const controls = new OrbitControls(camera, renderer.domElement);
    camera.position.set(0, 20, 100);
    controls.update();

    const geometry = new THREE.BoxGeometry(10, 10, 10);
    const material = new THREE.MeshBasicMaterial({color: 0x00ff00});
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    }

    animate();

}

export function MyGraph(): ReactElement<HTMLFormElement> {
    const refContainer = useRef(null);
    useEffect(() => {
        render(refContainer);
    }, [])
    return (<div ref={refContainer}></div>)
}
