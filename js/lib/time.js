class Timer {
    generalGameTime = 0;
    listOfTicks = new Array;

    checkTheTickTime() {
        for (var i = 0; i < this.listOfTicks.length; i++) {
            if (this.listOfTicks[i].endTime === this.generalGameTime) {
                this.listOfTicks[i].done = true;
                console.log('The Tick Has Be End: ' + this.listOfTicks[i].nameOfTick);
            }
        }

        this.generalGameTime++;
    }
}

class Tick {
    constructor(nameOfTick, startTime, endTime, done = false, old = false) {
        this.nameOfTick = nameOfTick;
        this.startTime = startTime;
        this.endTime = endTime;
        this.done = done;
        this.old = old;
    }
}


function timeLoop(timerObject) {
    timerObject.checkTheTickTime();
    //console.log(timerObject.generalGameTime);
}

export {
    Timer,
    Tick,
    timeLoop
};