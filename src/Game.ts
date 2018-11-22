/// <reference path="MathHelper.ts"/>
/// <reference path="Canvas.ts"/>
/// <reference path="Entity.ts"/>
/// <reference path="Player.ts"/>
/// <reference path="Asteroid.ts"/>
/// <reference path="Interfaces.ts"/>
/// <reference path="Views.ts"/>
/// <reference path="Vector.ts"/>

class Game {
    private state: string;
    private currentView: ViewBase;
    private highScores: Array<Score>;

    private canvasHelper: Canvas;

    public constructor(canvas: HTMLCanvasElement) {
        // Load the canvas object, once the images are loaded in, loop the main loop method in this class
        this.canvasHelper = new Canvas(canvas, () => setInterval(this.loop, 33));
        this.currentView = new GameView(this.canvasHelper);
    }

    public loop = () => {
        this.currentView.update();
    }
    
}

const game = new Game(<HTMLCanvasElement>document.getElementById('canvas'));