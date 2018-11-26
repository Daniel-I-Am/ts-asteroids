namespace Asteroids {
    export abstract class Entity {
        private src: string;
        private canvasHelper: CanvasHelper;

        protected location: Location;
        protected rotation: number;
        protected velocity: Vector;

        protected constructor(src: string, canvasHelper: CanvasHelper) {
            // save the canvas helper, this is used for the draw and undraw method
            this.canvasHelper = canvasHelper;
            // save the src. file name of the image to draw
            this.src = src;
        }

        public draw(): void {
            // draw the image at the right location
            this.canvasHelper.drawImage(this.src, this.location, this.rotation);
        };

        public undraw(): void {
            // clear *just* this image, can be used if we can't wipe the entire screen for some reason
            this.canvasHelper.clearRect(this.src, this.location, this.rotation);
        }

        protected move(): void {
            // grab a reference of the velocity
            let velocity = this.velocity.getValue();
            // update the position
            this.location.x += velocity[0];
            this.location.y += velocity[1];
            // if we are out of bounds, fix it
            if (this.location.x < 0) this.location.x = this.canvasHelper.getWidth();
            if (this.location.x > this.canvasHelper.getWidth()) this.location.x = 0;
            if (this.location.y < 0) this.location.y = this.canvasHelper.getHeight();
            if (this.location.y > this.canvasHelper.getHeight()) this.location.y = 0;
        }

        protected changeSprite(newSrc: string) {
            this.src = newSrc;
        }

        /**
         * Every entity needs to implement it's own update method.
         * This update method should call this.move
         */
        public abstract update(): void;
    }
}