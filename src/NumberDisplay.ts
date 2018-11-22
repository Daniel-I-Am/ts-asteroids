class NumberDisplay {
    private value: number
    private limit: number

    public constructor(
        value: number,
        limit: number
    ) {
        this.value = value;
        this.limit = limit;
    }

    public increment(): void {
        this.value ++;
        this.value %= this.limit;
    }

    public getValue(): number {
        return this.value;
    }
}