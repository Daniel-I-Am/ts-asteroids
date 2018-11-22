/// <reference path="ClockDisplay.ts"/>
/// <reference path="NumberDisplay.ts"/>
let date = new Date();
let clock = new ClockDisplay(date.getHours(), date.getMinutes());

for (let i = 0; i < 500; i++) {
    console.log(clock.getTime());
    clock.tick();
}