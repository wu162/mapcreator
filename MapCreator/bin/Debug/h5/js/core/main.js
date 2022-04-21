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
        this.light = new THREE.AmbientLight(0xeeeeee)
        this.textureMap = new TextureMap(this)
        this.heightMap = new HeightMap(this)
        this.mode = 0
        this.radius = 30
        this.init();
    }

    init() {
        this.initContainer();
        this.initRender();
        this.initScene();
        this.initViewControl();
        this.initCamera();
        this.initLight()
        this.controls.update();
    }

    initViewControl() {
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.minDistance = 2;
        this.controls.maxDistance = 18000;
        this.controls.maxPolarAngle = Math.PI / 2;
        this.controls.target.z = 100;
        this.controls.enableRotate = true
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

    initLight() {
        this.scene.add(this.light)
    }
}
let app = new App();
app.animate()

app.container.addEventListener('pointermove', onPointerMove)
app.container.addEventListener('mousedown', onMouseDown);
app.container.addEventListener('mouseup', onMouseUp);

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

function onMouseDown( event ) {
    if (event.button == 0) {
        // 左键
        app.heightMap.onLeftDown(event)
        app.textureMap.onLeftDown(event)
    } else if (event.button == 1) {
        // 中键
        app.heightMap.onMiddleDown(event)
        app.textureMap.onMiddleDown(event)
    } else if (event.button == 2) {
        // 右键
        app.heightMap.onRightDown(event)
        app.textureMap.onRightDown(event)
    }

}

function onMouseUp(event) {
    if (event.button == 0) {
        // 左键
    } else if (event.button == 1) {
        // 中键
    } else if (event.button == 2) {
        // 右键
    }
    app.heightMap.onMouseUp(event)
    app.textureMap.onMouseUp(event)
}

function onKeyDown(event) {
    console.log(event.keyCode)
    switch (event.keyCode) {
        case 32:
            app.controls.enableRotate = !app.controls.enableRotate
            app.mode = app.controls.enableRotate ? 0 : 1
            break
    }
}

function onWindowResize() {
    app.camera.aspect = window.innerWidth / window.innerHeight;
    app.camera.updateProjectionMatrix();
    app.renderer.setSize(window.innerWidth, window.innerHeight);
}
