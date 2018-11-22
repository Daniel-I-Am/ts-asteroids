// file: Main.ts
let clock = new Clock(13, 0, 24, 59);

for (let i = 0; i < 500; i++) {
    console.log(clock.getTime());
    clock.addTime();
}