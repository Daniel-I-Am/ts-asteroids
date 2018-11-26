/// <reference path="dataObjects/Interfaces.ts"/>
/// <reference path="dataObjects/Vector.ts"/>

/// <reference path="helpers/MathHelper.ts"/>
/// <reference path="helpers/CanvasHelper.ts"/>
/// <reference path="helpers/KeyHelper.ts"/>

/// <reference path="base/Entity.ts"/>
/// <reference path="base/ViewBase.ts"/>

/// <reference path="entities/Player.ts"/>
/// <reference path="entities/Asteroid.ts"/>

/// <reference path="views/GameView.ts"/>
/// <reference path="views/MenuView.ts"/>
namespace Asteroids {
    export class Game {
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
            // uncomment what you want to see:
            // menu screen and game
            this.canvasHelper = new CanvasHelper(canvas, () => {this.switchView(new MenuView(this.canvasHelper, () => {this.newInterval = setInterval(this.loop, 33)}, (newView: ViewBase) => this.switchView(newView)))});
            // title screen
            //this.canvasHelper = new CanvasHelper(canvas, () => {this.switchView(new TitleView(this.canvasHelper, () => {}))});
        }

        public loop = (): void => {
            // the loop just needs to update the currently loaded view, let that handle the update instead :)
            this.currentView.update();
        }
        
        public switchView(newView: ViewBase): void {
            // clear any interval currently set
            clearInterval(this.currentInterval);
            // save the new interval
            this.currentInterval = this.newInterval;
            // if this is not the first switch (if we previously had a view), stop it
            if (this.currentView)
                this.currentView.beforeExit();
            // save the new view
            this.currentView = newView;
        }
    }
}

// make the game object on the main canvas
const game = new Asteroids.Game(<HTMLCanvasElement>document.getElementById('canvas'));