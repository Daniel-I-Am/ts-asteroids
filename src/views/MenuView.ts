class MenuView extends ViewBase {
    private menuAsteroid: Asteroid;

    public constructor(canvasHelper: CanvasHelper, callback: () => void, changeView: (newView: ViewBase) => void) {
        super(canvasHelper);
        this.menuAsteroid = new Asteroid("meteorBrown_big1.png", canvasHelper, this.canvasHelper.getCenter(), 0, 0, .025);
        
        this.canvasHelper.writeText("Asteroids", 96, <Location>{x:this.canvasHelper.getCenter().x, y:100});
        this.canvasHelper.writeText("Press Start to Play!", 48, <Location>{x:this.canvasHelper.getCenter().x, y:this.canvasHelper.getHeight()-50});
        this.canvasHelper.drawButton("buttonBlue.png", "Start", <Location>{x:this.canvasHelper.getCenter().x, y:this.canvasHelper.getHeight()-200}, (_: MouseEvent) => changeView(new GameView(canvasHelper, () => callback())));
        callback();
    }

    public update = (): void => {
        this.menuAsteroid.undraw();
        this.menuAsteroid.update();
        this.drawGUI();
    }

    protected drawGUI(): void {
        this.menuAsteroid.draw();
    }
}
