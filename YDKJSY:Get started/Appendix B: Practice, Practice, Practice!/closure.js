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