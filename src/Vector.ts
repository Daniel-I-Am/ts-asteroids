class Vector {
    private numbers: Array<number>;

    public constructor(...args: Array<number>) {
        this.numbers = args;
    }

    public getValue() {
        return this.numbers;
    }

    public getSize() {
        return this.numbers.map(e => e**2)
    }
}