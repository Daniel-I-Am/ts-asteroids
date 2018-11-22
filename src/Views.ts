abstract class ViewBase {
    protected canvasHelper: Canvas

    protected constructor(canvasHelper: Canvas) {
        this.canvasHelper = canvasHelper;
    }

    public abstract update(): void;
    protected abstract drawGUI(): void;
}

class MenuView extends ViewBase {

    public constructor(canvasHelper: Canvas) {
        super(canvasHelper);
    }

    public update = (): void => {}
    protected drawGUI(): void {}
}

class GameView extends ViewBase {
    private player: Player;
    private asteroids: Array<Asteroid>;

    public constructor(canvasHelper: Canvas) {
        super(canvasHelper)
        this.player = new Player("playerShip1_blue.png", this.canvasHelper);
        this.asteroids = new Array<Asteroid>();
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