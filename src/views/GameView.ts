class GameView extends ViewBase {
    private player: Player;
    private asteroids: Array<Asteroid>;

    public constructor(canvasHelper: CanvasHelper, callback: () => void = null) {
        // apply the canvas helper to the ViewBase class
        super(canvasHelper)
        // make the player
        this.player = new Player("playerShip1_blue.png", this.canvasHelper);
        // make an empty array of asteroids
        this.asteroids = new Array<Asteroid>();
        // generate a random amount of asteroids
        let asteroidCount = MathHelper.randomNumber(5, 10);
        // define all asteroids we want in our game
        let asteroidImages: Array<AsteroidImage> = [
            {name: "Brown_big", images: [1,2,3,4]},
            {name: "Brown_med", images: [1,3]},
            {name: "Brown_small", images: [1,2]},
            {name: "Brown_tiny", images: [1,2]},
            {name: "Grey_big", images: [1,2,3,4]},
            {name: "Grey_med", images: [1,2]},
            {name: "Grey_small", images: [1,2]},
            {name: "Grey_tiny", images: [1,2]}
        ];
        // loop through the amount of asteroids we want
        for (let i = 0; i < asteroidCount; i++) {
            // pick a random AsteroidImage object from the previously defined array
            let asteroidType = asteroidImages[MathHelper.randomNumber(0, asteroidImages.length)];
            // pick a random image from the type we picked
            let asteroidSubImage = asteroidType.images[MathHelper.randomNumber(0, asteroidType.images.length)];
            // load in the sprite
            let spriteSrc = `meteor${asteroidType.name}${asteroidSubImage}.png`;
            // pick a random location to place the asteroid at, give it a random roation and speed
            // TODO: add in a rotationRate
            let x = MathHelper.randomNumber(0, this.canvasHelper.getWidth()),
                y = MathHelper.randomNumber(0, this.canvasHelper.getHeight()),
                rot = MathHelper.randomNumber(0, 360),
                speed = MathHelper.randomNumber(0.5, 6, 1);
            // generate the asteroid and put it on the asteroids list
            this.asteroids.push(new Asteroid(spriteSrc, canvasHelper, <Location>{x: x, y: y}, rot, speed))
        }
        // run any function passed in the constructor
        if (callback)
            callback();
    }

    public update = (): void => {
        // update the active entities
        this.canvasHelper.clear();
        this.player.update();
        this.asteroids.forEach(e => {
            e.update();
        });

        // draw the active entities
        this.asteroids.forEach(e => {
            e.draw();
        });
        this.player.draw();

        // Finish up with the GUI, should be over top everything else
        this.drawGUI();
    }

    protected drawGUI() {
        // draw the player lives in the top left
        for (let i = 0; i < this.player.getLives(); i++) {
            this.canvasHelper.drawImage("playerLife1_blue.png", <Location>{x: 48 + 32*i, y: 32}, 0);
        }
        // draw the score in the top right
        this.canvasHelper.writeText(`Score: ${this.player.getScore()} points`, 24, <Location>{x:this.canvasHelper.getWidth()-32, y:32}, "right");
    }

    public beforeExit() {
        // remove the event listeners
        this.player.keyHelper.destroy();
    };
}