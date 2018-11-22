class Vector {
    private numbers: Array<number>;

    public constructor(...args: Array<number>) {
        this.numbers = args;
    }

    public getValue(): Array<number> {
        return this.numbers;
    }

    public getSize(): number {
        return Math.sqrt(this.numbers.map(e => e**2).reduce((a,b) => a+b, 0));
    }

    public getDim(): number {
        return this.numbers.length;
    }

    public add(vector: Vector): Vector {
        if (this.getDim() != vector.getDim())
            throw new VectorDimError("Dimension of vector does not match.", `${this.getDim()} != ${vector.getDim()}`);
        let myValue = this.getValue(),
            thatValue = vector.getValue();
        return new Vector(...myValue.map((e,i) => e+thatValue[i]));
    }

    public multiply(scalar: number): Vector {
        return new Vector(...this.getValue().map(e => e*scalar));
    }

    public toString(): string {
        return `[${this.getValue().map(e => e.toString()).join(", ")}]`
    }
}

class VectorDimError {
    private message: string;
    private name: string;

    public constructor(...args: Array<string>) {
        this.name = "VectorDimError";
        this.message = args.join("\n")
    }
}