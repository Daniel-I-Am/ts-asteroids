class KeyHelper {
    public leftPressed: boolean;
    public rightPressed: boolean;
    public upPressed: boolean;
    public downPressed: boolean;

    public constructor() {
        this.leftPressed = false;
        this.rightPressed = false;
        this.upPressed = false;
        this.downPressed = false;

        window.addEventListener("keydown", this.keyDownHandler);
        window.addEventListener("keyup", this.keyUpHandler);
    }

    public destroy() {
        window.removeEventListener("keydown", this.keyDownHandler);
        window.removeEventListener("keyup", this.keyUpHandler);
    }

    private keyDownHandler = (event: KeyboardEvent): void => {
        switch(event.keyCode) {
            case 37:
            case 65:
                this.leftPressed = true;
                break;
            case 38:
            case 87:
                this.upPressed = true;
                break;
            case 39:
            case 68:
                this.rightPressed = true;
                break;
            case 40:
            case 83:
                this.downPressed = true;
                break;
        }
    }

    private keyUpHandler = (event: KeyboardEvent): void => {
        switch(event.keyCode) {
            case 37:
            case 65:
                this.leftPressed = false
                break;
            case 38:
            case 87:
                this.upPressed = false;
                break;
            case 39:
            case 68:
                this.rightPressed = false;
                break;
            case 40:
            case 83:
                this.downPressed = false;
                break;
        }
    }
}