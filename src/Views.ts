abstract class ViewBase {
    private canvasHelper: Canvas

    protected constructor(canvasHelper: Canvas) {
        this.canvasHelper = canvasHelper;
    }

    public abstract update(): void;
}

class MenuView extends ViewBase {

    public constructor(canvasHelper: Canvas) {
        super(canvasHelper);
    }

    public update = (): void => {
    }
}

class GameView extends ViewBase {
    private player: Player;
    private asteroids: Array<Asteroid>;

    public constructor(canvasHelper: Canvas) {
        super(canvasHelper)
        this.player = new Player("./assets/images/SpaceShooterRedux/PNG/playerShip1_blue.png");
    }

    public update = (): void => {
        this.player.update();
        this.asteroids.forEach(e => {
            e.update();
        });
    }
}