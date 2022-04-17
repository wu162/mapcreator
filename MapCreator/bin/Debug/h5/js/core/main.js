import * as THREE from 'three';
import {OrbitControls} from 'OrbitControls';
import {HeightMap} from 'HeightMap';

class App {

    constructor() {
        this.raycaster = new THREE.Raycaster();
        this.pointer = new THREE.Vector2();
        this.container = document.getElementById('container');
        this.renderer = new THREE.WebGLRenderer({antialias: true});
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 10, 20000);
        this.heights = this.getHeights(2000, 2000);
        this.texture = new THREE.CanvasTexture(this.getTexture(this.heights, 2000, 2000));
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
        this.addTerrain();
    }

    addTerrain() {
        // this.heights = this.getHeights(2000, 2000);
        const geometry = new THREE.PlaneGeometry(2000, 2000, 1, 1);
        geometry.rotateX(-Math.PI / 2);

        const vertices = geometry.attributes.position.array;

        for (let i = 0, j = 0, l = vertices.length; i < l; i++, j += 3) {

            vertices[j + 1] = this.heights[i] * 10;

        }

        // this.texture = new THREE.CanvasTexture(this.getTexture(this.heights, 2000, 2000));
        this.texture.wrapS = THREE.ClampToEdgeWrapping;
        this.texture.wrapT = THREE.ClampToEdgeWrapping;

        this.mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({map: this.texture}));
        this.scene.add(this.mesh);
    }

    initViewControl() {
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.minDistance = 100;
        this.controls.maxDistance = 10000;
        this.controls.maxPolarAngle = Math.PI / 2;
        this.controls.target.y = 100;
    }

    initCamera() {
        this.camera.position.y = 200;
        this.camera.position.x = 200;
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

    // initHelper() {
    //     const geometryHelper = new THREE.ConeGeometry(20, 100, 3);
    //     geometryHelper.translate(0, 50, 0);
    //     geometryHelper.rotateX(Math.PI / 2);
    //     this.helper = new THREE.Mesh(geometryHelper, new THREE.MeshNormalMaterial());
    //     this.scene.add(this.helper);
    // }

    getHeights(width, height) {

        const size = width * height, data = new Uint8Array(size);

        // for (let j = 0; j < 4; j++) {
        //     for (let i = 0; i < size; i++) {
        //         data[i] += 2;
        //     }
        // }

        return data;

    }

    getTexture(data, width, height) {

        let context, image, imageData;

        // const vector3 = new THREE.Vector3( 0, 0, 0 );

        const sun = new THREE.Vector3(1, 1, 1);
        sun.normalize();

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        context = canvas.getContext('2d');
        context.fillStyle = '#345324';
        context.fillRect(0, 0, width, height);

        image = context.getImageData(0, 0, canvas.width, canvas.height);
        imageData = image.data;

        for (let i = 0, j = 0, l = imageData.length; i < l; i += 4, j++) {
        }

        context.putImageData(image, 0, 0);

        return canvas;

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
window.addEventListener('resize', onWindowResize);

function onPointerMove(event) {

    app.pointer.x = (event.clientX / app.renderer.domElement.clientWidth) * 2 - 1;
    app.pointer.y = -(event.clientY / app.renderer.domElement.clientHeight) * 2 + 1;
    app.raycaster.setFromCamera(app.pointer, app.camera);

    const intersects = app.raycaster.intersectObject(app.mesh);

    if (intersects.length > 0) {
        const point = intersects[ 0 ].point;
        app.heightMap.onPointerMove(point)
    }

}

function onPointerDown( event ) {

    app.pointer.set( ( event.clientX / window.innerWidth ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1 );

    app.raycaster.setFromCamera( app.pointer, app.camera );

    const intersects = app.raycaster.intersectObjects(app.mesh);

    if ( intersects.length > 0 ) {

        const intersect = intersects[ 0 ];

    }

}

function onWindowResize() {
    app.camera.aspect = window.innerWidth / window.innerHeight;
    app.camera.updateProjectionMatrix();
    app.renderer.setSize(window.innerWidth, window.innerHeight);
}