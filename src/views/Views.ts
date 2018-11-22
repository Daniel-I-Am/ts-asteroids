abstract class ViewBase {
    protected canvasHelper: CanvasHelper

    protected constructor(canvasHelper: CanvasHelper) {
        this.canvasHelper = canvasHelper;
    }

    public abstract update(): void;
    protected abstract drawGUI(): void;
}

class MenuView extends ViewBase {

    public constructor(canvasHelper: CanvasHelper) {
        super(canvasHelper);
    }

    public update = (): void => {}
    protected drawGUI(): void {}
}

class GameView extends ViewBase {
    private player: Player;
    private asteroids: Array<Asteroid>;

    public constructor(canvasHelper: CanvasHelper, callback: () => void) {
        super(canvasHelper)
        this.player = new Player("playerShip1_blue.png", this.canvasHelper);
        this.asteroids = new Array<Asteroid>();
        let asteroidCount = MathHelper.randomNumber(5, 10);
        let asteroidImages: AsteroidImage[] = [
            {name: "Brown_big", images: [1,2,3,4]},
            {name: "Brown_med", images: [1,3]},
            {name: "Brown_small", images: [1,2]},
            {name: "Brown_tiny", images: [1,2]},
            {name: "Grey_big", images: [1,2,3,4]},
            {name: "Grey_med", images: [1,2]},
            {name: "Grey_small", images: [1,2]},
            {name: "Grey_tiny", images: [1,2]}
        ];
        for (let i = 0; i < asteroidCount; i++) {
            let asteroidType = asteroidImages[MathHelper.randomNumber(0, asteroidImages.length)];
            let asteroidSubImage = asteroidType.images[MathHelper.randomNumber(0, asteroidType.images.length)];
            let spriteSrc = `meteor${asteroidType.name}${asteroidSubImage}.png`;
            let x = MathHelper.randomNumber(0, this.canvasHelper.getWidth()),
                y = MathHelper.randomNumber(0, this.canvasHelper.getHeight()),
                rot = MathHelper.randomNumber(0, 360),
                speed = MathHelper.randomNumber(0.1, 1.2, 1);
            this.asteroids.push(new Asteroid(spriteSrc, canvasHelper, <Location>{x: x, y: y}, rot, speed))
        }
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
        for (let i = 0; i < this.player.getLives(); i++) {
            this.canvasHelper.drawImage("playerLife1_blue.png", <Location>{x: 48 + 32*i, y: 32}, 0);
        }
        this.canvasHelper.writeText(`Score: ${this.player.getScore()} points`, 24, this.canvasHelper.getWidth()-32, 32, "right")
    } 
}