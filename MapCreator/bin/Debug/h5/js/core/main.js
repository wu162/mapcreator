import * as THREE from 'three';
import {OrbitControls} from 'OrbitControls';
import {HeightMap} from 'HeightMap';
import {TextureMap} from "TextureMap";

class App {

    constructor() {
        this.raycaster = new THREE.Raycaster();
        this.pointer = new THREE.Vector2();
        this.container = document.getElementById('container');
        this.renderer = new THREE.WebGLRenderer({antialias: true});
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 10, 30000);
        this.textureMap = new TextureMap(this)
        this.heightMap = new HeightMap(this)
        this.mode = 1
        this.init();
    }

    init() {
        this.initContainer();
        this.initRender();
        this.initScene();
        this.initViewControl();
        this.initCamera();
        this.controls.update();
    }

    initViewControl() {
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.minDistance = 10;
        this.controls.maxDistance = 18000;
        this.controls.maxPolarAngle = Math.PI / 2;
        this.controls.target.z = 100;
        this.controls.enableRotate = false
        // this.controls.target.z = 200;
        // this.controls.target.x = 1000;
        // this.controls.rotateX(-Math.PI / 2)
    }

    initCamera() {
        this.camera.position.y = 100;
        this.camera.position.x = 0;

    }

    initRender() {
        // this.renderer = new THREE.WebGLRenderer({antialias: true});
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.container.appendChild(this.renderer.domElement);
    }

    initContainer() {
        this.container.innerHTML = '';
    }

    initScene() {
        this.scene.background = new THREE.Color(0xbfd1e5);
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        this.render();
    }

    render() {
        this.renderer.render(this.scene, this.camera);
    }
}
let app = new App();
app.animate()

app.container.addEventListener('pointermove', onPointerMove)
app.container.addEventListener('pointerdown', onPointerDown);
app.container.addEventListener('pointerup', onPointerUp);

window.addEventListener('keydown', onKeyDown);
window.addEventListener('resize', onWindowResize);

function onPointerMove(event) {

    app.pointer.x = (event.clientX / app.renderer.domElement.clientWidth) * 2 - 1;
    app.pointer.y = -(event.clientY / app.renderer.domElement.clientHeight) * 2 + 1;
    app.raycaster.setFromCamera(app.pointer, app.camera);

    const intersects = app.raycaster.intersectObject(app.heightMap.mesh);

    if (intersects.length > 0) {
        const intersect = intersects[ 0 ];
        app.heightMap.onPointerMove(intersect)
        app.textureMap.onPointerMove(intersect)
    }

}

function onPointerDown( event ) {

    // app.pointer.x = (event.clientX / app.renderer.domElement.clientWidth) * 2 - 1;
    // app.pointer.y = -(event.clientY / app.renderer.domElement.clientHeight) * 2 + 1;
    //
    // app.raycaster.setFromCamera( app.pointer, app.camera );
    //
    // const intersects = app.raycaster.intersectObjects(app.heightMap.mesh);

    // if ( intersects.length > 0 ) {
    //     const intersect = intersects[ 0 ];
        app.heightMap.onPointerDown(null)
        app.textureMap.onPointerDown(null)
    // }

}

function onPointerUp(event) {

    // app.pointer.x = (event.clientX / app.renderer.domElement.clientWidth) * 2 - 1;
    // app.pointer.y = -(event.clientY / app.renderer.domElement.clientHeight) * 2 + 1;
    //
    // app.raycaster.setFromCamera( app.pointer, app.camera );
    //
    // const intersects = app.raycaster.intersectObjects(app.heightMap.mesh);
    //
    // if ( intersects.length > 0 ) {
    //     const intersect = intersects[ 0 ];
    //     app.heightMap.onPointerUp(intersect)
    //     app.textureMap.onPointerUp(intersect)
    // } else {
        app.heightMap.onPointerUp(null)
        app.textureMap.onPointerUp(null)
    // }
}

function onKeyDown(event) {
    console.log(event.keyCode)
    switch (event.keyCode) {
        case 32:
            app.controls.enableRotate = !app.controls.enableRotate
            break
    }
}

function onWindowResize() {
    app.camera.aspect = window.innerWidth / window.innerHeight;
    app.camera.updateProjectionMatrix();
    app.renderer.setSize(window.innerWidth, window.innerHeight);
}
