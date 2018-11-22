class MenuView extends ViewBase {
    private menuAsteroid: Asteroid;

    public constructor(canvasHelper: CanvasHelper, callback: () => void) {
        super(canvasHelper);
        this.menuAsteroid = new Asteroid("meteorBrown_big1.png", canvasHelper, this.canvasHelper.getCenter(), 0, 0, .025);
        callback();
    }

    public update = (): void => {
        this.canvasHelper.clear();
        this.menuAsteroid.update();
        this.drawGUI();
    }

    protected drawGUI(): void {
        this.canvasHelper.writeText("Asteroids", 96, this.canvasHelper.getCenter().x, 100);
        this.canvasHelper.writeText("Press Start to Play!", 48, this.canvasHelper.getCenter().x, this.canvasHelper.getHeight()-50);
        this.menuAsteroid.draw();
        //this.canvasHelper.drawButton("buttonBlue.png", "Start");
    }
}
