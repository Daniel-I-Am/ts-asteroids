class MathHelper {

    // we cannot instantiate the MathHelper. It can only have static methods
    private constructor() {}
    
    /**
     * Generates a random number bigger (inclusive) than the min and smaller than the max
     * @param min 
     * @param max 
     */
    public static randomNumber(min: number, max: number, digits: number = 0) {
        return Math.floor(Math.random()*(max-min)*(10**digits))/(10**digits)+min;
    }

    /**
     * Turns degrees into radians
     * @param degrees 
     */
    public static toRadian(degrees: number) {
        return degrees*Math.PI/180
    }
}