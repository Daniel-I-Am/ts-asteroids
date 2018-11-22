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
        this.canvasHelper = new Canvas(canvas);
        this.currentView = new GameView(this.canvasHelper);
    }

    public loop = () => {
        this.currentView.update();
    }
    
}

const game = new Game(<HTMLCanvasElement>document.getElementById('canvas'));
setInterval(game.loop, 33);