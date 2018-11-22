abstract class Entity {
    private image: HTMLImageElement;
    private canvasHelper: Canvas;

    protected location: Location;
    protected rotation: number;
    protected velocity: Vector;

    protected constructor(src: string, canvasHelper: Canvas) {
        this.canvasHelper = canvasHelper;
        this.image = new Image();
        this.image.src = src;
    }

    public draw(): void {
        this.canvasHelper.drawImage(this.image, this.location, this.rotation);
    };

    public abstract update(): void;
}