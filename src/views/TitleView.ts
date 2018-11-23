class TitleView extends ViewBase {

    public constructor(
        canvasHelper: CanvasHelper,
        callback: () => void,
        highscores: Array<Score> = new Array<Score>(),
        score: number = 0
    ) {
        super(canvasHelper);
        this.canvasHelper.writeText(`You died with ${score} points!`, 48, <Location>{x: this.canvasHelper.getCenter().x, y: 100});
        this.canvasHelper.writeText("Highscores", 32, <Location>{x: this.canvasHelper.getCenter().x, y:this.canvasHelper.getCenter().y-100});
        highscores.forEach((e, i) => {
            this.canvasHelper.writeText(`${e.playerName} - ${e.score}`, 32, <Location>{x: this.canvasHelper.getCenter().x, y:this.canvasHelper.getCenter().y-100+32*i});
        });
        callback();
    }

    public update(): void {}
    public drawGUI(): void {}
    public beforeExit(): void {}
}