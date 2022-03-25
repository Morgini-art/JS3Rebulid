class Timer {
	generalGameTime = 0;
	listOfTicks = [];
	
	checkTheTickTime() {
		for (var i = 0; i == this.listOfTicks.length; i++) {
			if(this.listOfTicks[i].endTime == this.generalGameTime) {
				this.listOfTicks[i].done = true;
				console.log('The Tick Has Be End: '+this.listOfTicks[i]);
			}
		}
		
		this.generalGameTime++;
	}
}

class Tick {
	constructor(startTime,endTime,done = false) {
		this.startTime = startTime;
		this.endTime = endTime;
		this.done = done;
	}
}

const generalTimer = new Timer();
console.log(generalTimer);

function loop() {
	generalTimer.checkTheTickTime();
	generalTimer.generalGameTime++;
}

setInterval(loop, 1);

generalTimer.listOfTicks.push(new Tick(20,6000));
