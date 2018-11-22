class ClockDisplay {
    constructor(currentHour, currentMinute) {
        this.hours = new NumberDisplay(currentHour, 24);
        this.minutes = new NumberDisplay(currentMinute, 60);
    }
    tick() {
        this.minutes.increment();
        if (this.minutes.getValue() === 0) {
            this.hours.increment();
        }
    }
    getTime() {
        let hourVal = this.hours.getValue(), minVal = this.minutes.getValue();
        return `${hourVal}:${"0".repeat(2 - minVal.toString().length)}${minVal}`;
    }
}
class NumberDisplay {
    constructor(value, limit) {
        this.value = value;
        this.limit = limit;
    }
    increment() {
        this.value++;
        this.value %= this.limit;
    }
    getValue() {
        return this.value;
    }
}
let date = new Date();
let clock = new ClockDisplay(date.getHours(), date.getMinutes());
for (let i = 0; i < 500; i++) {
    console.log(clock.getTime());
    clock.tick();
}
//# sourceMappingURL=app.js.map