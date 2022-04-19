
import * as THREE from 'three'

class TextureMap {

    constructor(app) {
        this.app = app
        this.texture = new THREE.CanvasTexture(this.getTexture(2000, 2000));
        this.texture.wrapS = THREE.ClampToEdgeWrapping;
        this.texture.wrapT = THREE.ClampToEdgeWrapping;
        this.radius = 60
    }

    getTexture(width, height) {

        let context, image;

        // const vector3 = new THREE.Vector3( 0, 0, 0 );

        const sun = new THREE.Vector3(1, 1, 1);
        sun.normalize();

        this.terrainTexture = document.createElement('canvas');
        this.terrainTexture.width = width;
        this.terrainTexture.height = height;

        context = this.terrainTexture.getContext('2d');
        context.fillStyle = '#345324';
        context.fillRect(0, 0, width, height);

        // image = context.getImageData(0, 0, this.terrainTexture.width, this.terrainTexture.height);
        // imageData = image.data;

        // for (let i = 0, j = 0, l = imageData.length; i < l; i += 4, j++) {
        // }

        // context.putImageData(image, 0, 0);
        this.finalTexture = document.createElement('canvas');
        this.finalTexture.width = width;
        this.finalTexture.height = height;

        context = this.finalTexture.getContext('2d');
        context.drawImage(this.terrainTexture, 0,0)
        context.fillStyle = "#0000ff";
        context.fillRect(0, 0, 60, 60)

        return this.finalTexture;
    }

    onPointerMove(intersect) {
        const uv = intersect.uv;

        let realX = uv.x * this.finalTexture.width
        let realY = this.finalTexture.height - uv.y * this.finalTexture.height
        let context = this.finalTexture.getContext('2d');
        context.clearRect( 0, 0, this.finalTexture.width, this.finalTexture.height );
        context.drawImage(this.terrainTexture, 0,0)
        context.fillStyle = "rgba(80,80,120,0.6)";
        context.fillRect(realX - this.radius,  realY - this.radius, this.radius * 2, this.radius * 2)
        this.texture.needsUpdate = true
    }

    onPointerDown(intersect) {

    }

    onPointerUp(intersect) {

    }
}

 export { TextureMap }
