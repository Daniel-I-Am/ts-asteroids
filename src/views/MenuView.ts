class MenuView extends ViewBase {
    private menuAsteroid: Asteroid;

    public constructor(canvasHelper: CanvasHelper, callback: () => void, changeView: (newView: ViewBase) => void) {
        super(canvasHelper);
        // make the menu asteroid and save it
        this.menuAsteroid = new Asteroid("meteorBrown_big1.png", canvasHelper, this.canvasHelper.getCenter(), 0, 0, .025);
        
        // write the text to screen in the right place
        this.canvasHelper.writeText("Asteroids", 96, <Location>{x:this.canvasHelper.getCenter().x, y:100});
        this.canvasHelper.writeText("Press Start to Play!", 48, <Location>{x:this.canvasHelper.getCenter().x, y:this.canvasHelper.getHeight()-50});
        // draw the button. When clicked it will bring us to the GameView
        this.canvasHelper.drawButton("buttonBlue.png", "Start", <Location>{x:this.canvasHelper.getCenter().x, y:this.canvasHelper.getHeight()-200}, (_: MouseEvent) => changeView(new GameView(canvasHelper, () => callback())));
        // callback :)
        callback();
    }

    public update = (): void => {
        // remove the current asteroid
        this.menuAsteroid.undraw();
        // rotate the asteroid
        this.menuAsteroid.update();
        // draw the gui (only the asteroid in this case)
        this.drawGUI();
    }

    protected drawGUI(): void {
        this.menuAsteroid.draw();
    }

    public beforeExit() {}
}
