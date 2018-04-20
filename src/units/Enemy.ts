import 'phaser';

class Enemy extends Phaser.GameObjects.Sprite {
    scene: Phaser.Scene;

    constructor(config) {
        super(config.scene, config.x, config.y, 'player');

        this.scene = config.scene;
        this.scene.add.existing(this);
        // console.log(this.type);
    }

    update() {
        this.angle++;
        console.log('update');
    }

}

export default Enemy;