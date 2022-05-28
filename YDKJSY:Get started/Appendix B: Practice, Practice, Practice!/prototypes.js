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