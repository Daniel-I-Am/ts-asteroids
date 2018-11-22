abstract class Entity {
    private src: string;
    private canvasHelper: Canvas;

    protected location: Location;
    protected rotation: number;
    protected velocity: Vector;

    protected constructor(src: string, canvasHelper: Canvas) {
        this.canvasHelper = canvasHelper;
        this.src = src;
    }

    public draw(): void {
        this.canvasHelper.drawImage(this.src, this.location, this.rotation);
    };

    protected move(): void {
        let velocity = this.velocity.getValue();
        this.location.x += velocity[0];
        this.location.y += velocity[1];
        if (this.location.x < 0) this.location.x = this.canvasHelper.getWidth();
        if (this.location.x > this.canvasHelper.getWidth()) this.location.x = 0;
        if (this.location.y < 0) this.location.y = this.canvasHelper.getHeight();
        if (this.location.y > this.canvasHelper.getHeight()) this.location.y = 0;
    }

    public abstract update(): void;
}