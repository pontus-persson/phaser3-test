import 'phaser';

class MouseControl {
    camera: Phaser.Cameras.Scene2D.Camera;
    input: Phaser.Input.InputPlugin;
    lastpos: Phaser.Math.Vector2 = new Phaser.Math.Vector2(0, 0);
    delta: Phaser.Math.Vector2 = new Phaser.Math.Vector2(0, 0);

    constructor(config) {
        this.camera = config.camera
        this.input = config.input
        // console.log(this);

        this.input.on('pointerdown', function (pointer) {
            this.lastpos.x = pointer.x;
            this.lastpos.y = pointer.y;
        }, this);


        this.input.on('pointermove', function (pointer) {
            // console.log(pointer.event.which);
            if (pointer.event.which === 1) {
                // console.log('drag', this.lastpos, pointer.position);
                this.delta.x = this.lastpos.x - pointer.x
                this.delta.y = this.lastpos.y - pointer.y
                this.camera.scrollX += this.delta.x;
                this.camera.scrollY += this.delta.y;
                this.lastpos.x = pointer.x;
                this.lastpos.y = pointer.y;
            }
        }, this);
    }

    setCamera(camera) {
        this.camera = camera;
    }

    setInput(input) {
        this.input = input;
    }

    update(delta) {
        // console.log('update '+ delta);
    }

}

export default MouseControl;