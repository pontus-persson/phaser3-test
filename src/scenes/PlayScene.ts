import Unit from '../units/Unit';
import Enemy from '../units/Enemy';
import MouseControl from '../utils/MouseControl';

class TestScene extends Phaser.Scene {
    player: Phaser.GameObjects.Sprite;
    unit: Unit;
     cursors: any;
    controls: MouseControl;

    graphics: Phaser.GameObjects.Graphics;
    path: Phaser.Geom.Polygon;

    constructor() {
        super({
            key: 'TestScene'
        });
    }

    preload() {
        this.load.tilemapTiledJSON('map', '/assets/tilemaps/desert.json');
        this.load.image('Desert', '/assets/tilemaps/tmw_desert_spacing.png');
        this.load.image('player', '/assets/sprites/mushroom.png');
    }

    create() {
        var map:Phaser.Tilemaps.Tilemap = this.make.tilemap({ key: 'map' });
        var tileset:Phaser.Tilemaps.Tileset = map.addTilesetImage('Desert');
        var layer:Phaser.Tilemaps.StaticTilemapLayer = map.createStaticLayer(0, tileset, 0, 0);

        this.graphics = this.add.graphics({ lineStyle: { width: 2, color: 0x33eeff } });
        // console.log(graphics);

        map.objects.forEach(element  => {
            if (element.name == "Path") {
                let points = [];
                element.objects[0].polyline.forEach(point => {
                    points.push(new Phaser.Geom.Point(point.x, point.y));
                });
                this.path = new Phaser.Geom.Polygon(points);

                console.log(points);
                // this.path = new Phaser.Geom.Polygon(element.objects[0].polyline);
                // console.log(element.objects[0].polyline);
                // console.log(this.path);
                // console.log(path.points);
                // console.log(element);
            }
        });
        // console.log(map.objects);
        // console.log(this);
        // console.log(layer);
        // layer.scale.set(2);
        // layer.resizeWorld();

        this.player = this.add.sprite(130, 130, 'player');
        this.cursors = this.input.keyboard.createCursorKeys();

        this.unit = new Unit({ scene:this, x:300, y:100 });

        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        // this.cameras.main.startFollow(this.player, false);

        this.controls = new MouseControl({
            camera: this.cameras.main,
            input: this.input,
        });

        this.graphics.strokePoints(this.path.points, false);


    }

    update(time: number, delta: number) {
        // console.log(delta);

        // this.graphics.strokePath();
        // this.graphics.strokePoints(this.path.points, false);
        // this.path.draw(this.graphics);

        this.player.angle += 1;
        if (this.cursors.left.isDown) {
            this.player.x -= 5;
        }
        if (this.cursors.right.isDown) {
            this.player.x += 5;
        }
        if (this.cursors.down.isDown) {
            this.player.y += 5;
        }
        if (this.cursors.up.isDown) {
            this.player.y -= 5;
        }
    }
}

export default TestScene;