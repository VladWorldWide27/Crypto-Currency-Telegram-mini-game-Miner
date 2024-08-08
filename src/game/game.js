const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

function preload() {
    this.load.image('snake', './assets/snake.png');
    this.load.image('lizard', './assets/lizard.png');
}

function create() {
    this.snakes = this.physics.add.group();
    this.lizards = this.physics.add.group();

    this.time.addEvent({
        delay: 1000,
        callback: spawnCreature,
        callbackScope: this,
        loop: true
    });

    this.input.on('pointerdown', function (pointer) {
        const creatures = [...this.snakes.getChildren(), ...this.lizards.getChildren()];
        creatures.forEach(creature => {
            if (Phaser.Geom.Intersects.RectangleToRectangle(creature.getBounds(), pointer)) {
                creature.destroy();
                // Add your logic to handle scoring or other actions here
            }
        });
    }, this);
}

function update() {
    this.snakes.getChildren().forEach(snake => {
        snake.x += snake.speed;
        if (snake.x > this.sys.game.config.width) {
            snake.destroy();
        }
    });

    this.lizards.getChildren().forEach(lizard => {
        lizard.x += lizard.speed;
        if (lizard.x > this.sys.game.config.width) {
            lizard.destroy();
        }
    });
}

function spawnCreature() {
    const creatureType = Phaser.Math.Between(0, 1) === 0 ? 'snake' : 'lizard';
    const creature = creatureType === 'snake' ? this.snakes.create(0, Phaser.Math.Between(100, 500), 'snake') : this.lizards.create(0, Phaser.Math.Between(100, 500), 'lizard');
    creature.speed = Phaser.Math.Between(2, 5);
}
