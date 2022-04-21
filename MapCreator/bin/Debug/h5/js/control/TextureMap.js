
import * as THREE from 'three'

class TextureMap {

    constructor(app) {
        this.app = app
        // this.texture = new THREE.CanvasTexture(this.getTexture(2000, 2000));
        this.texture = this.getTexture(2000, 2000)
        this.texture.wrapS = THREE.ClampToEdgeWrapping;
        this.texture.wrapT = THREE.ClampToEdgeWrapping;
    }

    getTexture(width, height) {


        this.texture = new THREE.Texture(undefined, THREE.UVMapping, THREE.RepeatWrapping, THREE.RepeatWrapping);
        this.terrainTexture = document.createElement('canvas');
        this.terrainTexture.width = width;
        this.terrainTexture.height = height;
        this.context = this.terrainTexture.getContext('2d');
        this.texture.image = this.terrainTexture;

        const that = this
        this.background = document.createElement( 'img' );
        this.background.addEventListener('load', function () {
            that.terrainTexture.width = that.background.naturalWidth
            that.terrainTexture.height = that.background.naturalHeight
            // that._crossRadius = Math.ceil( Math.min( that.terrainTexture.width, that.terrainTexture.height / 30 ) );
            // that._crossMax = Math.ceil( 0.70710678 * that._crossRadius );
            // that._crossMin = Math.ceil( that._crossMax / 10 );
            // that._crossThickness = Math.ceil( that._crossMax / 10 );
            that.context.clearRect( 0, 0, that.terrainTexture.width, that.terrainTexture.height );
            that.context.drawImage(that.background, 0, 0)
            that.texture.needsUpdate = true
        })
        // this.background.crossOrigin = ''
        this.background.src = '../../assets/images/wall.jpeg';

        // let context, image;

        // const vector3 = new THREE.Vector3( 0, 0, 0 );

        // const sun = new THREE.Vector3(1, 1, 1);
        // sun.normalize();

        // this.terrainTexture = document.createElement('canvas');
        // this.terrainTexture.width = width;
        // this.terrainTexture.height = height;
        // this.context = this.terrainTexture.getContext('2d');
        //
        // let context = this.terrainTexture.getContext('2d');
        // let textureLoader = new THREE.TextureLoader();
        // let texture = textureLoader.load("../../assets/images/wall.jpeg", function(img){
        //     // texture.needsUpdate = true
        // });
        // this.context.drawImage(texture.image,0,0)
        // this.context.fillStyle = "#00ff00";
        // this.context.fillRect(0, 0, 60, 60)

        // context.fillStyle = '#345324';
        // context.fillRect(0, 0, width, height);

        // image = context.getImageData(0, 0, this.terrainTexture.width, this.terrainTexture.height);
        // imageData = image.data;

        // for (let i = 0, j = 0, l = imageData.length; i < l; i += 4, j++) {
        // }

        // context.putImageData(image, 0, 0);
        // this.finalTexture = document.createElement('canvas');
        // this.finalTexture.width = width;
        // this.finalTexture.height = height;
        //
        // context = this.finalTexture.getContext('2d');
        // context.drawImage(this.terrainTexture, 0,0)
        // context.fillStyle = "#0000ff";
        // context.fillRect(0, 0, 60, 60)

        return this.texture;
    }

    onPointerMove(intersect) {
        if (this.app.mode == 1) {
            const uv = intersect.uv;

            let realX = uv.x * this.terrainTexture.width
            let realY = this.terrainTexture.height - uv.y * this.terrainTexture.height
            this.context.clearRect( 0, 0, this.terrainTexture.width, this.terrainTexture.height );
            this.context.drawImage(this.background, 0,0)
            this.context.fillStyle = "rgba(80,80,160,0.6)";
            this.context.fillRect(realX - this.app.radius / 2,  realY - this.app.radius / 2, this.app.radius, this.app.radius)
            this.texture.needsUpdate = true
        }
    }

    onLeftDown(event) {

    }

    onRightDown(event) {

    }

    onMiddleDown(event) {

    }

    onMouseUp(event) {

    }
}

 export { TextureMap }
