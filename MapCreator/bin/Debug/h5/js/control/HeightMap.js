import * as THREE from 'three';

class HeightMap {

    constructor(app) {
        this.app = app
        this.initHelper()
    }

    initHelper() {
        // const geometryHelper = new THREE.PlaneGeometry(100, 100);
        const geometryHelper = new THREE.ConeGeometry(20, 100, 3);
        geometryHelper.translate(0, 3, 0);
        // geometryHelper.rotateX(Math.PI / 2);
        this.helper = new THREE.Mesh(geometryHelper, new THREE.MeshNormalMaterial());
        this.app.scene.add(this.helper);
    }

    onPointerMove(pos) {
        console.log("onPointerMove", pos)
        this.helper.position.set( 0, 0, 0 );
        this.helper.position.copy( pos );
    }
}

export {HeightMap}