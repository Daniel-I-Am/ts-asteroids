class Canvas {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    
    public constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');

        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    public writeTextToCanvas(
        text: string,
        fontsize: number,
        xCoordinate: number,
        yCoordinate: number,
        color: string,
        alignment: CanvasTextAlign,
    ) {}
    public writeImageToCanvas(
        src: string,
        xCoordinate: number,
        yCoordinate: number,
    ) {}
    public writeButtonToCanvas(

    ) {}

    public drawImage(
        image: HTMLImageElement,
        location: Location,
        rotation: number
    ) {
        this.ctx.save();
        this.ctx.translate(location.x, location.y);
        this.ctx.rotate(rotation);
        this.ctx.drawImage(image, -image.width/2, -image.height/2);
        this.ctx.restore();
    }

    public getCenter(): Location {
        return <Location>{x: this.getWidth()/2, y: this.getHeight()/2}
    }

    public getWidth(): number {
        return this.canvas.width;
    }
    
    public getHeight(): number {
        return this.canvas.height;
    }
}