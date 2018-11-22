/// <reference path="helpers/MathHelper.ts"/>
/// <reference path="helpers/CanvasHelper.ts"/>
/// <reference path="Entity.ts"/>
/// <reference path="Player.ts"/>
/// <reference path="Asteroid.ts"/>
/// <reference path="Interfaces.ts"/>
/// <reference path="views/ViewBase.ts"/>
/// <reference path="views/GameView.ts"/>
/// <reference path="views/MenuView.ts"/>
/// <reference path="Vector.ts"/>

class Game {
    private state: string;
    private currentView: ViewBase;
    private highScores: Array<Score>;
    private currentInterval: number;
    private newInterval: number;

    private canvasHelper: CanvasHelper;

    public constructor(canvas: HTMLCanvasElement) {
        // Load the canvas object, once the images are loaded in,
        // load in the menu and then start the main loop
        this.currentInterval = null;
        this.canvasHelper = new CanvasHelper(canvas, () => {this.switchView(new MenuView(this.canvasHelper, () => {this.newInterval = setInterval(this.loop, 33)}, (newView: ViewBase) => this.switchView(newView)))});
    }

    public loop = (): void => {
        this.currentView.update();
    }
    
    public switchView(newView: ViewBase): void {
        clearInterval(this.currentInterval);
        this.currentInterval = this.newInterval;
        this.currentView = newView;
    }
}

const game = new Game(<HTMLCanvasElement>document.getElementById('canvas'));