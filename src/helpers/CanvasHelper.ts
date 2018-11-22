class CanvasHelper {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private spriteMap: CanvasImageSource;
    private spriteMapData: Array<SpriteSheetTexture>;
    
    public constructor(canvas: HTMLCanvasElement, callback: () => void) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.spriteMap = new Image();
        this.spriteMap.src = "./assets/images/SpaceShooterRedux/Spritesheet/sheet.png";

        fetch('./assets/images/SpaceShooterRedux/Spritesheet/sheet.xml')
            .then((response) => {
                return response.text()
            })
            .then((str) => {
                let parser = new DOMParser();
                this.spriteMapData = [];
                Array.prototype.forEach.call(parser.parseFromString(str, "text/xml").getElementsByTagName("SubTexture"), (e: Element) => {
                    let atts = e.attributes;
                    this.spriteMapData.push({name: atts[0].nodeValue, x: parseInt(atts[1].nodeValue), y: parseInt(atts[2].nodeValue), width: parseInt(atts[3].nodeValue), height: parseInt(atts[4].nodeValue)});
                });
                //console.table(this.spriteMapData);
            }).then(() => {
                callback();
            });

        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    public writeText(
        text: string,
        fontsize: number,
        xCoordinate: number,
        yCoordinate: number,
        align: CanvasTextAlign = "center",
        baseLine: CanvasTextBaseline = "middle",
        color: string = "white",
        fontFamily: string = "Minecraft"
    ) {
        this.ctx.fillStyle = color;
        this.ctx.font = `${fontsize}px ${fontFamily}`;
        this.ctx.textAlign = align;
        this.ctx.textBaseline = baseLine;
        this.ctx.fillText(text, xCoordinate, yCoordinate);
    }
    
    public writeButtonToCanvas(

    ) {}

    public drawImage(
        src: string,
        location: Location,
        rotation: number
    ): SpriteSheetTexture {
        let image = this.spriteMapData.filter(obj => {
            return obj.name === src
        })[0];
        if (!image) return null;
        this.ctx.save();
        this.ctx.translate(location.x, location.y);
        this.ctx.rotate(rotation);
        this.ctx.drawImage(this.spriteMap, image.x, image.y, image.width, image.height, -image.width/2, -image.height/2, image.width, image.height);
        this.ctx.restore();
        return image;
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

    public clear(): void {
        this.ctx.clearRect(0, 0, this.getWidth(), this.getHeight());
    }
}