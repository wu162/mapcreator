import * as THREE from 'three';
import {TextureMap} from 'TextureMap';

class HeightMap {

    constructor(app) {
        this.mapWidth = 600
        this.mapHeight = 600
        this.cellSizeShift = 1   // 方块大小必须为2的次幂,加快计算

        this.app = app
        this.textureMap = app.textureMap
        // this.heights = this.getHeights(mapWidth, 200);
        this.geometry = new THREE.PlaneBufferGeometry(this.mapWidth << this.cellSizeShift, this.mapHeight << this.cellSizeShift, this.mapWidth - 1, this.mapHeight - 1);
        this.addTerrain();
        this.radius = 100
        this.leftDown = false
        // this.initHelper()
    }

    initHelper() {
        // const geometryHelper = new THREE.ConeGeometry(20, 100, 3);
        // geometryHelper.translate(0, 3, 0);
        // // geometryHelper.rotateX(Math.PI / 2);
        // this.helper = new THREE.Mesh(geometryHelper, new THREE.MeshNormalMaterial());
        // this.app.scene.add(this.helper);
    }

    getHeights(width, height) {

        const size = width * height, data = new Uint8Array(size);

        return data;

    }

    addTerrain() {
        this.geometry.rotateX(-Math.PI / 2);

        const vertices = this.geometry.attributes.position.array;

        for (var i = 0; i < vertices.length / 3; i++) {
            vertices[i * 3 + 1] = 0;
        }
        // console.log(vertices.length)
        let textureLoader = new THREE.TextureLoader();
        let texture = textureLoader.load("../../assets/images/wall.jpeg");
        this.mesh = new THREE.Mesh(this.geometry, new THREE.MeshLambertMaterial({map: texture, side: THREE.DoubleSide}));
        this.app.scene.add(this.mesh);
    }

    onPointerMove(intersect) {
        if (this.leftDown && this.app.mode == 1) {
            for (let i = -this.radius;i < this.radius;i++) {
                for (let j = -this.radius;j < this.radius;j++) {
                    let nx = intersect.point.x + i
                    let nz = intersect.point.z + j
                    if (this.inbound(nx, nz)) {
                        let vertGroupIndex = this.getVertIndex(nx, nz)
                        this.geometry.attributes.position.array[vertGroupIndex * 3 + 1] = 100
                    }
                }
            }
            this.geometry.attributes.position.needsUpdate = true
        }
    }

    inbound(nx, ny) {
        return nx >= -this.mapWidth && nx <= this.mapWidth && ny >= -this.mapHeight && ny <= this.mapHeight
    }

    getVertIndex(x,z) {
        let nx = x
        let nz = z
        let vertGroupIndex = ((nz + this.mapHeight) >> this.cellSizeShift) * this.mapWidth + ((nx + this.mapWidth) >> this.cellSizeShift);
        return vertGroupIndex
    }

    onLeftDown(event) {
        // for (let i = 1 ;i < this.mapWidth * 500;i+=3) {
        //     this.geometry.attributes.position.array[i] = 400
        // }
        // this.geometry.attributes.position.needsUpdate = true
        this.leftDown = true
    }

    onRightDown(event) {

    }

    onMiddleDown(event) {

    }

    onMouseUp(event) {
        this.leftDown = false
    }
}

export {HeightMap}
