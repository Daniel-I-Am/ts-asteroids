class ClockDisplay {
    private hours: NumberDisplay;
    private minutes: NumberDisplay;

    public constructor(currentHour: number, currentMinute: number) {
        this.hours = new NumberDisplay(currentHour, 24);
        this.minutes = new NumberDisplay(currentMinute, 60);
    }

    public tick(): void {
        this.minutes.increment();
        if (this.minutes.getValue() === 0) {
            this.hours.increment();
        }
    }

    public getTime(): string {
        let hourVal = this.hours.getValue(),
            minVal = this.minutes.getValue();
        return `${hourVal}:${"0".repeat(2-minVal.toString().length)}${minVal}`
    }
}