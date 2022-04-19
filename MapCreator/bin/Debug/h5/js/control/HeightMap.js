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
        this.geometry = new THREE.PlaneBufferGeometry(this.mapWidth << this.cellSizeShift, this.mapHeight << this.cellSizeShift, this.mapWidth, this.mapHeight);
        this.addTerrain();
        this.radius = 60
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

        // for (let j = 0; j < 4; j++) {
        //     for (let i = 0; i < size; i++) {
        //         data[i] += 2;
        //     }
        // }

        return data;

    }

    addTerrain() {
        this.geometry.rotateX(-Math.PI / 2);

        const vertices = this.geometry.attributes.position.array;

        // for (let i = 0, j = 0, l = vertices.length; i < l; i++, j += 3) {
        //     vertices[j + 1] = this.heights[i] * 10;
        // }
        for (var i = 0; i < vertices.length / 3; i++) {
            vertices[i * 3 + 1] = 0;
        }
        console.log(vertices.length)
        this.mesh = new THREE.Mesh(this.geometry, new THREE.MeshBasicMaterial({map: this.textureMap.texture, side: THREE.DoubleSide}));
        this.app.scene.add(this.mesh);
    }

    onPointerMove(intersect) {
        if (this.leftDown && this.app.mode == 1) {
            console.log("onPointerMove2")
            // console.log("test")
            // let vertGroupIndex = this.getVertIndex(intersect.x, intersect.z)
            // this.geometry.attributes.position.array[vertGroupIndex * 3 + 1] += 2000
            // this.geometry.attributes.position.needsUpdate = true
            for (let i = -this.radius;i < this.radius;i++) {
                for (let j = -this.radius;j < this.radius;j++) {
                    let nx = intersect.point.x + i
                    let nz = intersect.point.y + j
                    console.log(nx + " , " + nz)
                    if (this.inbound(nx, nz)) {
                        console.log("inbound")
                        let vertGroupIndex = this.getVertIndex(nx, nz)
                        this.geometry.attributes.position.array[vertGroupIndex * 3 + 1] = 200
                    }
                }
            }
            this.geometry.attributes.position.needsUpdate = true
        }
        // console.log(vertIndex + "  |  " + vertXIndex + " , " + vertZIndex)
    }

    inbound(nx, ny) {
        return nx >= -this.mapWidth && nx <= this.mapWidth && ny >= -this.mapHeight && ny <= this.mapHeight
    }

    getVertIndex(x,z) {
        let nx = Math.round(x);
        let nz = Math.round(z);
        let vertGroupIndex = ((nz + this.mapHeight) >> this.cellSizeShift) * this.mapWidth + ((nx + this.mapWidth) >> this.cellSizeShift);
        // let vertXIndex = vertIndex * 3
        // let vertZIndex = vertIndex * 3 + 2
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
