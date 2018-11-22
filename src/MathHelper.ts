class MathHelper {

    private constructor() {}
    /**
     * Generates a random number bigger (inclusive) than the min and smaller than the max
     * @param min 
     * @param max 
     */
    public static randomNumber(min: number, max: number) {
        return Math.floor(Math.random()*(max-min)+min);
    }
}