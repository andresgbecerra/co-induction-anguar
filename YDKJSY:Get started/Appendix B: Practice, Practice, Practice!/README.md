## You Don’t Know JS Yet: Get Started 

### Appendix B: Practice, Practice, Practice!

***

**Practicing Comparisons**
```ruby
const dayStart = '07:30';
const dayEnd = '17:45';

//----------------My Solution-------------------------------

function scheduleMeeting(startTime, durationMinutes) {
    let _startTime = `${startTime.length == 4? '0' + startTime:startTime}`;
    const min = Number(_startTime.split(':')[1]) + durationMinutes;
    let _endTime = `${_startTime.split(':')[0]}:${min}`;
    if (min >= 60) {
        str = `${Number(_startTime.split(':')[0]) + Math.floor(min/60)}:${min>60? min-60:'00'}`
        _endTime = `${str.length == 4? '0' + str:str}`;
    }

    return _startTime >= dayStart && _endTime <= dayEnd;

}

console.log(scheduleMeeting("7:00", 15));
console.log(scheduleMeeting("07:15", 30));
console.log(scheduleMeeting("7:30", 30));
console.log(scheduleMeeting("11:30", 60));
console.log(scheduleMeeting("17:00", 45));
console.log(scheduleMeeting("17:30", 30));
console.log(scheduleMeeting("18:00", 15));

console.log('\n');

//----------------Book Solution-------------------------------

function scheduleMeetingBook(startTime, durationMinutes) {

    var [, meetingStartHour, meetingStartMinutes] = startTime.match(/^(\d{1,2}):(\d{2})$/) || [];
    durationMinutes = Number(durationMinutes);

    if (typeof meetingStartHour == "string" && typeof meetingStartMinutes == "string") {
        let durationHours = Math.floor(durationMinutes / 60);
        durationMinutes = durationMinutes - (durationHours * 60);
        let meetingEndHour = Number(meetingStartHour) + durationHours;
        let meetingEndMinutes = Number(meetingStartMinutes) + durationMinutes;

        if (meetingEndMinutes >= 60) {
            meetingEndHour = meetingEndHour + 1;
            meetingEndMinutes = meetingEndMinutes - 60;
        }
        // re-compose fully-qualified time strings 
        // (to make comparison easier)
        let meetingStart = `${meetingStartHour.padStart(2,"0") }:${meetingStartMinutes.padStart(2,"0") }`;
        let meetingEnd = `${ String(meetingEndHour).padStart(2,"0")}:${ String(meetingEndMinutes).padStart(2,"0")}`;
        // NOTE: since expressions are all strings, 
        // comparisons here are alphabetic, but it's 
        // safe here since they're fully qualified 
        // time strings (ie, "07:15" < "07:30") 
        return (meetingStart >= dayStart && meetingEnd <= dayEnd);
    }
    return false;
}


console.log(scheduleMeetingBook("7:00", 15));
console.log(scheduleMeetingBook("07:15", 30));
console.log(scheduleMeetingBook("7:30", 30));
console.log(scheduleMeetingBook("11:30", 60));
console.log(scheduleMeetingBook("17:00", 45));
console.log(scheduleMeetingBook("17:30", 30));
console.log(scheduleMeetingBook("18:00", 15));

```

***

**Practicing Closure**
```ruby
// ---------- My Solution--------------------

function range(start, end) {
    var arr = [];
    if (typeof start == 'number' && typeof end == 'number') {
        for (let i = start; i <= end; i++) {
            arr.push(i);
        }
        return console.log(arr);
    }

    return function iterador(end) {
        arr = [];
        for (let i = start; i <= end; i++) {
            arr.push(i);
        }
        return console.log(arr);
    }
}



range(3, 3); // [3]
range(3, 8); // [3,4,5,6,7,8]
range(3, 0); // []

console.log('\n');

var start3 = range(3);
var start4 = range(4);

start3(3); // [3]
start3(8); // [3,4,5,6,7,8]
start3(0); // []
console.log('\n');

start4(6); // [4,5,6]

console.log('\n');

// ---------------Book Solution------------------------------

function rangeBook(start, end) {

    start = Number(start) || 0;

    if (end === undefined) {
        return function getEnd(end) {
            return getRange(start, end);
        };
    } else {
        end = Number(end) || 0;
        return getRange(start, end);
    }
    // **********************
    function getRange(start, end) {
        var ret = [];
        for (let i = start; i <= end; i++) {
            ret.push(i);
        }
        return console.log(ret);
    }
}


rangeBook(3, 3); // [3]
rangeBook(3, 8); // [3,4,5,6,7,8]
rangeBook(3, 0); // []
console.log('\n');



var start3 = rangeBook(3);
var start4 = rangeBook(4);
start3(3); // [3]
start3(8); // [3,4,5,6,7,8]
start3(0); // []
console.log('\n');

start4(6); // [4,5,6]
```
***

**Practicing Prototypes**

```ruby
function randMax(max) {
    return Math.trunc(1E9 * Math.random()) % max;
}

var reel = {
    symbols: ["X", "Y", "Z", "W", "$", "*", "<", "@"],
    spin() {
        if (this.position == null) {
            this.position = randMax(this.symbols.length - 1);
        }
        this.position = (this.position + 100 + randMax(100)) % this.symbols.length;       
    },
    display() {
        if (this.position == null) {
            this.position = randMax(this.symbols.length - 1);
        }       
        return this.symbols[this.position];
    }
};

// -----------My Solution----------------------

var slotMachine = {
    reels: [
        Object.create(reel), Object.create(reel), Object.create(reel)
    ],
    spin() {
        this.reels.forEach(function spinReel(reel) {
            reel.spin();
        });
    },
    display() {
        this.reels.forEach(reel => {
            var items = [];
            for (let i = 0; i < this.reels.length; i++) {
                reel.spin();
                items.push(reel.display());
            }
            return console.log(items.join(' | '));
        });
    }
};


slotMachine.spin();
slotMachine.display();
// < | @ | *
// @ | X | <
// X | Y | @
console.log('\n');
slotMachine.spin();
slotMachine.display();
// Z | X | W
// W | Y | $
// $ | Z | *

console.log('\n');

//--------------Book Solution----------------

var slotMachineBook = {
    reels: [Object.create(reel), Object.create(reel), Object.create(reel)],
    spin() {
        this.reels.forEach(function spinReel(reel) {
            reel.spin();
        });
    },
    display() {
        var lines = [];
        // display all 3 lines on the slot machine
        for (let linePos = -1; linePos <= 1; linePos++) {
            let line = this.reels.map(
                function getSlot(reel) {
                    var slot = Object.create(reel);
                    slot.position = (
                        reel.symbols.length +
                        reel.position +
                        linePos
                    ) % reel.symbols.length;

                    return reel.display.call(slot);
                });

            lines.push(line.join(" | "));

        }

        return console.log(lines.join("\n"));
    }
};

slotMachineBook.spin();
slotMachineBook.display();
// < | @ | *
// @ | X | <
// X | Y | @
console.log('\n');
slotMachineBook.spin();
slotMachineBook.display();
// Z | X | W
// W | Y | $
// $ | Z | *
```



_The End_
