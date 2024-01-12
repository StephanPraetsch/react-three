import * as THREE from 'three';
import {Mesh, PerspectiveCamera, Scene} from 'three';
import {ReactElement, useEffect, useRef} from "react";
import Stats from 'three/examples/jsm/libs/stats.module'
import GUI from "three/examples/jsm/libs/lil-gui.module.min";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

function render(refContainer: any) {

    let camera: PerspectiveCamera, scene: Scene, renderer: any, startTime: number, object: Mesh, stats: Stats;

    init();
    animate();

    function init() {

        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

        camera.position.set(0, 1.3, 3);

        scene = new THREE.Scene();

        // Lights

        scene.add(new THREE.AmbientLight(0xcccccc));

        const spotLight = new THREE.SpotLight(0xffffff, 60);
        spotLight.angle = Math.PI / 5;
        spotLight.penumbra = 0.2;
        spotLight.position.set(2, 3, 3);
        spotLight.castShadow = true;
        spotLight.shadow.camera.near = 3;
        spotLight.shadow.camera.far = 10;
        spotLight.shadow.mapSize.width = 1024;
        spotLight.shadow.mapSize.height = 1024;
        scene.add(spotLight);

        const dirLight = new THREE.DirectionalLight(0x55505a, 3);
        dirLight.position.set(0, 3, 0);
        dirLight.castShadow = true;
        dirLight.shadow.camera.near = 1;
        dirLight.shadow.camera.far = 10;

        dirLight.shadow.camera.right = 1;
        dirLight.shadow.camera.left = -1;
        dirLight.shadow.camera.top = 1;
        dirLight.shadow.camera.bottom = -1;

        dirLight.shadow.mapSize.width = 1024;
        dirLight.shadow.mapSize.height = 1024;
        scene.add(dirLight);

        // ***** Clipping planes: *****

        const localPlane = new THREE.Plane(new THREE.Vector3(0, -1, 0), 0.8);
        const globalPlane = new THREE.Plane(new THREE.Vector3(-1, 0, 0), 0.1);

        // Geometry

        const material = new THREE.MeshPhongMaterial({
            color: 0x80ee10,
            shininess: 100,
            side: THREE.DoubleSide,

            // ***** Clipping setup (material): *****
            clippingPlanes: [localPlane],
            clipShadows: true

        });

        const geometry = new THREE.TorusKnotGeometry(0.4, 0.08, 95, 20);

        object = new THREE.Mesh(geometry, material);
        object.castShadow = true;
        scene.add(object);

        const ground = new THREE.Mesh(
            new THREE.PlaneGeometry(9, 9, 1, 1),
            new THREE.MeshPhongMaterial({color: 0xa0adaf, shininess: 150})
        );

        ground.rotation.x = -Math.PI / 2; // rotates X/Y to X/Z
        ground.receiveShadow = true;
        scene.add(ground);

        // Stats

        stats = new Stats();
        refContainer.current?.appendChild(stats.dom);

        // Renderer

        renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
        refContainer.current?.appendChild(renderer.domElement);
        renderer.shadowMap.enabled = true;
        renderer.setPixelRatio(window.devicePixelRatio);
        window.addEventListener('resize', onWindowResize);

        // ***** Clipping setup (renderer): *****
        const globalPlanes = [globalPlane],
            Empty = Object.freeze([]);
        renderer.clippingPlanes = Empty; // GUI sets it to globalPlanes
        renderer.localClippingEnabled = true;

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.target.set(0, 1, 0);
        controls.update();

        const gui = new GUI(),
            folderLocal = gui.addFolder('Local Clipping'),
            propsLocal = {
                get 'Enabled'() {
                    return renderer.localClippingEnabled;
                },
                set 'Enabled'(v) {
                    renderer.localClippingEnabled = v;
                },
                get 'Shadows'() {
                    return material.clipShadows;
                },
                set 'Shadows'(v) {
                    material.clipShadows = v;
                },
                get 'Plane'() {
                    return localPlane.constant;
                },
                set 'Plane'(v) {
                    localPlane.constant = v;
                }
            },

            folderGlobal = gui.addFolder('Global Clipping'),
            propsGlobal = {
                get 'Enabled'() {
                    return renderer.clippingPlanes !== Empty;
                },
                set 'Enabled'(v) {
                    renderer.clippingPlanes = v ? globalPlanes : Empty;
                },
                get 'Plane'() {
                    return globalPlane.constant;
                },
                set 'Plane'(v) {
                    globalPlane.constant = v;
                }
            };

        folderLocal.add(propsLocal, 'Enabled');
        folderLocal.add(propsLocal, 'Shadows');
        folderLocal.add(propsLocal, 'Plane', 0.3, 1.25);

        folderGlobal.add(propsGlobal, 'Enabled');
        folderGlobal.add(propsGlobal, 'Plane', -0.4, 3);

        startTime = Date.now();

    }

    function onWindowResize() {

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(window.innerWidth, window.innerHeight);

    }

    function animate() {

        const currentTime = Date.now();
        const time = (currentTime - startTime) / 1000;

        requestAnimationFrame(animate);

        object.position.y = 0.8;
        object.rotation.x = time * 0.5;
        object.rotation.y = time * 0.2;
        object.scale.setScalar(Math.cos(time) * 0.125 + 0.875);

        stats.begin();
        renderer.render(scene, camera);
        stats.end();

    }

}

export function InteractiveScene(): ReactElement<HTMLFormElement> {
    const refContainer = useRef(null);
    useEffect(() => {
        render(refContainer);
    }, [])
    return (<div ref={refContainer}></div>)
}
