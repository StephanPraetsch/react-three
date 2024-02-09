// https://hofk.de/main/discourse.threejs/2020/DodecahedronCanvasTexture/DodecahedronCanvasTexture.html

import * as THREE from 'three';
import {ReactElement, useEffect, useRef} from "react";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

function render(refContainer: any) {
    console.log("Dodecahedron.render()");
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
    const renderer = new THREE.WebGLRenderer();

    renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
    refContainer.current?.appendChild(renderer.domElement);

    camera.lookAt(0, 0, 0);

    camera.position.set(0, 10, 10);

    // @ts-ignore
    // tslint:disable-next-line
    const control = new OrbitControls(camera, renderer.domElement);

    scene.add(new THREE.GridHelper());

    let light = new THREE.DirectionalLight(0xffffff, 2);
    light.position.setScalar(10);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0xffffff, 1));

    let dodeGeometry = new THREE.DodecahedronGeometry(2);

    const base = new THREE.Vector2(0, 0.5);
    const center = new THREE.Vector2();
    const angle = THREE.MathUtils.degToRad(72);
    let baseUVs = [
        base.clone().rotateAround(center, angle * 1).addScalar(0.5),
        base.clone().rotateAround(center, angle * 2).addScalar(0.5),
        base.clone().rotateAround(center, angle * 3).addScalar(0.5),
        base.clone().rotateAround(center, angle * 4).addScalar(0.5),
        base.clone().rotateAround(center, angle * 0).addScalar(0.5)
    ];

    let uvs = [];
    let sides = [];
    for (let i = 0; i < 12; i++) {
        uvs.push(
            baseUVs[1].x, baseUVs[1].y,
            baseUVs[2].x, baseUVs[2].y,
            baseUVs[0].x, baseUVs[0].y,

            baseUVs[2].x, baseUVs[2].y,
            baseUVs[3].x, baseUVs[3].y,
            baseUVs[0].x, baseUVs[0].y,

            baseUVs[3].x, baseUVs[3].y,
            baseUVs[4].x, baseUVs[4].y,
            baseUVs[0].x, baseUVs[0].y
        );
        sides.push(i, i, i, i, i, i, i, i, i);
    }
    dodeGeometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
    dodeGeometry.setAttribute("sides", new THREE.Float32BufferAttribute(sides, 1));

    let meshMaterial = new THREE.MeshStandardMaterial({
        roughness: 0.25,
        metalness: 0.75,
        map: createTexture(),
    });
    // meshMaterial.onBeforeCompile = (shader: any) => {
    //     shader.vertexShader = `
    // 	attribute float sides;
    //   ${shader.vertexShader}
    // `.replace(
    //         `#include <uv_vertex>`,
    //         `
    //   	#include <uv_vertex>
    //
    //     vUv.x = (1./16.) * (vUv.x + sides);
    //   `
    //     );
    //     console.log(shader.vertexShader);
    // }

    let mesh = new THREE.Mesh(dodeGeometry, meshMaterial);
    scene.add(mesh);

    renderer.setAnimationLoop(() => {
        renderer.render(scene, camera);
    })

    function createTexture() {
        let canvas = document.createElement("canvas");
        let step = 64;
        canvas.width = step * 16;
        canvas.height = step;
        let ctx = canvas.getContext("2d")!;
        ctx.fillStyle = "#7f7f7f";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.font = "40px Arial";
        ctx.textAlign = "center";
        ctx.fillStyle = "aqua";
        ctx.textBaseline = "middle";
        for (let i = 0; i < 12; i++) {
            ctx.fillText(String(i + 1), step * 0.5 + step * i, step * 0.5 + 10);
        }

        return new THREE.CanvasTexture(canvas);
    }

    renderer.render(scene, camera);
}

export function Dodecahedron(): ReactElement<HTMLFormElement> {
    const refContainer = useRef(null);
    useEffect(() => {
        render(refContainer);
    }, [])
    return (<div ref={refContainer}></div>)
}
