namespace Asteroids {
    export class CanvasHelper {
        private canvas: HTMLCanvasElement;
        private ctx: CanvasRenderingContext2D;
        private spriteMap: CanvasImageSource;
        private spriteMapData: Array<SpriteSheetTexture>;
        
        public constructor(canvas: HTMLCanvasElement, callback: () => void) {
            this.canvas = canvas;
            this.ctx = canvas.getContext('2d');
            this.spriteMap = new Image();
            // wait until the sprite map is loaded in
            this.spriteMap.addEventListener('load', () => {
                // now fetch the translation between sprites and spritemap
                fetch('./assets/images/SpaceShooterRedux/Spritesheet/sheet.xml')
                    .then((response) => {
                        // read the response text
                        return response.text()
                    })
                    .then((str) => {
                        // parse as XML
                        let parser = new DOMParser();
                        this.spriteMapData = [];
                        Array.prototype.forEach.call(parser.parseFromString(str, "text/xml").getElementsByTagName("SubTexture"), (e: Element) => {
                            // put it into an array
                            let atts = e.attributes;
                            this.spriteMapData.push({name: atts[0].nodeValue, x: parseInt(atts[1].nodeValue), y: parseInt(atts[2].nodeValue), width: parseInt(atts[3].nodeValue), height: parseInt(atts[4].nodeValue)});
                        });
                        //console.table(this.spriteMapData);
                    }).then(() => {
                        // run the callback once done. The game should be waiting for this to be done, in case it wants to draw something
                        callback();
                    });
                });
            // set source of spritesheet
            this.spriteMap.src = "./assets/images/SpaceShooterRedux/Spritesheet/sheet.png";
            // set the canvas width and height
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        }

        /**
         * Writes text to screen
         * @param text Text to write to screen
         * @param fontsize Size of the text
         * @param location Location to put the text at
         * @param align Text alignment to use, default: center
         * @param baseLine Baseline to use when printing, default: middle
         * @param color Color of the text, default: white
         * @param fontFamily Fontface to use, default: Minecraft
         */
        public writeText(
            text: string,
            fontsize: number,
            location: Location,
            align: CanvasTextAlign = "center",
            baseLine: CanvasTextBaseline = "middle",
            color: string = "white",
            fontFamily: string = "Minecraft"
        ) {
            this.ctx.fillStyle = color;
            this.ctx.font = `${fontsize}px ${fontFamily}`;
            this.ctx.textAlign = align;
            this.ctx.textBaseline = baseLine;
            this.ctx.fillText(text, location.x, location.y);
        }

        /**
         * Draws a button on screen that can be clicked
         * @param src Image to use for the button
         * @param caption Caption to put on the button
         * @param location Location to put the button
         * @param callback What to run when you click the button
         */
        public drawButton(
            src: string,
            caption: string,
            location: Location,
            callback: (event: MouseEvent) => void = null
        ) {
            let image = this.drawImage(src, location, 0);
            if (!image) return;
            this.writeText(caption, 24, location, "center", "middle", "black")
            if (!callback) return;
            let _listener = (event: MouseEvent) => {
                // define the top left and bottom right of the button
                let topleft = <Location>{x: this.canvas.offsetLeft+location.x-image.width/2, y: this.canvas.offsetTop+location.y-image.height/2},
                    bottomRight = <Location>{x: this.canvas.offsetLeft+location.x+image.width/2, y: this.canvas.offsetTop+location.y+image.height/2};
                // check if we clicked within the button
                if (event.x < bottomRight.x && event.x > topleft.x && event.y < bottomRight.y && event.y > topleft.y) {
                    // if we did, remove this event listener
                    this.canvas.removeEventListener('click', _listener);
                    // run the callback provided with the event as argument
                    callback(event);
                }
            }
            // actually register the event listener
            this.canvas.addEventListener('click', _listener);
        }

        /**
         * Draws an image to screen
         * @param src Image to draw
         * @param location Where to draw it
         * @param rotation Rotation to draw at
         */
        public drawImage(
            src: string,
            location: Location,
            rotation: number
        ): SpriteSheetTexture {
            // filters through all sprites, returns all matches. Then we grab the first and assign it to `image`
            let image = this.getImage(src);
            // if we did not find an image, return
            if (!image) return null;
            // save the current state
            this.ctx.save();
            // move the origin to the desired location
            this.ctx.translate(location.x, location.y);
            // rotate
            this.ctx.rotate(rotation);
            // draw
            this.ctx.drawImage(this.spriteMap, image.x, image.y, image.width, image.height, -image.width/2, -image.height/2, image.width, image.height);
            // reset to saved state
            this.ctx.restore();
            return image;
        }

        public getImage(src: string): SpriteSheetTexture {
            let image = this.spriteMapData.filter(obj => {
                return obj.name === src;
            })[0];
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

        /**
         * Clears the area of an image
         * @param src Gets the image, for the area to clear
         * @param location location of the image
         * @param rotation rotation of the image
         */
        public clearRect(
            src: string,
            location: Location,
            rotation: number
        ): void {
            // filters through all sprites, returns all matches. Then we grab the first and assign it to `image`
            let image = this.getImage(src);
            // if we have no match, return
            if (!image) return null;
            // same as drawImage method
            this.ctx.save();
            this.ctx.translate(location.x, location.y);
            this.ctx.rotate(rotation);
            this.ctx.clearRect(-image.width/2, -image.height/2, image.width, image.height);
            this.ctx.restore();
        }
    }
}