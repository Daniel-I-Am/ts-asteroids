class Clock
{
    private hours: number;
    private minutes: number;
    private maxHours: number;
    private maxMinutes: number;

    public constructor(hours: number, minutes: number, maxHours: number, maxMinutes: number = 59)
    {
        this.hours = hours;
        this.minutes = minutes;
        this.maxHours = maxHours;
        this.maxMinutes = maxMinutes;
    }

    public getHours(): number
    {
        return this.hours;
    }

    public getMinutes(): number
    {
        return this.minutes;
    }

    public addTime(): void
    {
        if (this.minutes === this.maxMinutes) {
            this.minutes = 0;
            if (this.hours === this.maxHours) {
                this.hours = 0;
            } else {
                this.hours++;
            }
        } else {
            this.minutes++;
        }
    }

    public getTime(): string
    {
        if (this.minutes < 10) {
            return `${this.hours}:0${this.minutes}`;
        }
        return `${this.hours}:${this.minutes}`;
    }
}