class Clock {
    constructor(hours, minutes, maxHours, maxMinutes = 59) {
        this.hours = hours;
        this.minutes = minutes;
        this.maxHours = maxHours;
        this.maxMinutes = maxMinutes;
    }
    getHours() {
        return this.hours;
    }
    getMinutes() {
        return this.minutes;
    }
    addTime() {
        if (this.minutes === this.maxMinutes) {
            this.minutes = 0;
            if (this.hours === this.maxHours) {
                this.hours = 0;
            }
            else {
                this.hours++;
            }
        }
        else {
            this.minutes++;
        }
    }
    getTime() {
        if (this.minutes < 10) {
            return `${this.hours}:0${this.minutes}`;
        }
        return `${this.hours}:${this.minutes}`;
    }
}
let clock = new Clock(13, 0, 24, 59);
for (let i = 0; i < 500; i++) {
    console.log(clock.getTime());
    clock.addTime();
}
//# sourceMappingURL=app.js.map