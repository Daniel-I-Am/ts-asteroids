/// <reference path="helpers/MathHelper.ts"/>
/// <reference path="helpers/Canvas.ts"/>
/// <reference path="Entity.ts"/>
/// <reference path="Player.ts"/>
/// <reference path="Asteroid.ts"/>
/// <reference path="Interfaces.ts"/>
/// <reference path="views/Views.ts"/>
/// <reference path="Vector.ts"/>

class Game {
    private state: string;
    private currentView: ViewBase;
    private highScores: Array<Score>;

    private canvasHelper: CanvasHelper;

    public constructor(canvas: HTMLCanvasElement) {
        // Load the canvas object, once the images are loaded in, loop the main loop method in this class
        this.canvasHelper = new CanvasHelper(canvas, () => {this.currentView = new GameView(this.canvasHelper, () => setInterval(this.loop, 33))});
    }

    public loop = () => {
        this.currentView.update();
    }
    
}

const game = new Game(<HTMLCanvasElement>document.getElementById('canvas'));