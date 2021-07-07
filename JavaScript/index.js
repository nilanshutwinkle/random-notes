"use strict"

// Source: https://masteringjs.io/tutorials/fundamentals/compare-arrays
function arrayShallowEquals(a, b) {
  return Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index]);
}

const animalSpeak = (name, sound) => `A ${name} says ${sound}.`;

// - - - -  - - - -  - - - -  - - - -  - - - -  - - - -  - - - -  - - - -
// ARRAY METHODS (ES5)
// - - - -  - - - -  - - - -  - - - -  - - - -  - - - -  - - - -  - - - -

const arr = [1, 2, 3];

console.assert(arr.every(a => a > 0), 'Expected true.');

{
    let x = arr.map(a => a ** 2);
    console.assert(arrayShallowEquals([ 1, 4, 9 ], x), `Unexpected value: ${x}`);
}

{
    let x = arr.reduce((a,b) => a+b, 0);
    console.assert(6 === x, `Unexpected value: ${x}`);
}

// x = 123;
// console.log(x);

// - - - -  - - - -  - - - -  - - - -  - - - -  - - - -  - - - -  - - - -
// Date
// - - - -  - - - -  - - - -  - - - -  - - - -  - - - -  - - - -  - - - -

console.log(Date.now()); // (ES5)

const myDate = new Date(2020, 6, 6, 5, 25);

console.assert(2020 === myDate.getFullYear(), `Unexpected value: ${myDate.getFullYear()}`);
console.assert(6 === myDate.getMonth(), `Unexpected value: ${myDate.getMonth()}`);
console.assert(6 === myDate.getDate(), `Unexpected value: ${myDate.getDate()}`);
console.assert(5 === myDate.getHours(), `Unexpected value: ${myDate.getHours()}`);
console.assert(25 === myDate.getMinutes(), `Unexpected value: ${myDate.getMinutes()}`);

{
    const expect = '7/6/2020, 5:25:00 AM';
    const found = myDate.toLocaleString()
    console.assert(expect === found, `Unexpected value: ${found}`);
}

{
    const expect = '2020-07-06T09:25:00.000Z';
    const found = myDate.toISOString()
    console.assert(expect === found, `Unexpected value: ${found}`);
}

// - - - -  - - - -  - - - -  - - - -  - - - -  - - - -  - - - -  - - - -
// Luxon (Moment.js rewrite)
// - - - -  - - - -  - - - -  - - - -  - - - -  - - - -  - - - -  - - - -

const { DateTime } = require("luxon");

// equivalent to DateTime.local()
console.log(DateTime.now().toLocaleString(DateTime.DATETIME_MED));

const myDT = DateTime.local(2020, 6, 15, 8, 30); // June 15 2020 8:30 AM

console.assert(2020 === myDT.year, `Unexpected.value: ${myDT.year}`);
console.assert(6 === myDT.month, `Unexpected.value: ${myDT.month}`);
console.assert(15 === myDT.day, `Unexpected.value: ${myDT.day}`);
console.assert(8 === myDT.hour, `Unexpected.value: ${myDT.hour}`);
console.assert(30 === myDT.minute, `Unexpected.value: ${myDT.minute}`);

{
    const expect = '2020-06-15T08:30:00.000-04:00'; // ISO 8601
    console.assert(expect === myDT.toString(), `Unexpected value: ${myDT.toString()}`);
}

{
    const expect = '7/7/2020';
    const found = DateTime.fromISO("2020-07-07").toLocaleString();
    console.assert(expect === found, `Unexpected value: ${found}`);
}

{
    const expect = 'Jul 7, 2020, 5:35 AM';
    const found = DateTime.fromISO("2020-07-07T05:35:00")
        .toLocaleString(DateTime.DATETIME_MED);
    console.assert(expect === found, `Unexpected value: ${found}`);
}

// supports math: dt.plus, dt.minus, dt.startOf, dt.endOf
// immutable, but supports "updating". e.g., dt.set({ hour: 3 })

// Durations. E.g., Duration.fromObject({ hours: 2, minutes: 7 })
// Durations also support math, getters, toISO.

// Also supports intervals.

// - - - -  - - - -  - - - -  - - - -  - - - -  - - - -  - - - -  - - - -
// GETTERS, SETTERS (ES5)
// - - - -  - - - -  - - - -  - - - -  - - - -  - - - -  - - - -  - - - -

let character = {
 first_name: "Nate",
 last_name: "Dogg",

 get fullName() {
   return `${this.first_name} ${this.last_name}`;
 },
 set fullName(str) {
   [this.first_name, this.last_name] = str.split(" ");
 }

};

console.assert('Nate Dogg' === character.fullName, `Unexpected value: ${character.fullName}`);

character.fullName = "Snoop Dogg";

console.assert('Snoop' === character.first_name, `Unexpected value: ${character.first_name}`);

// - - - -  - - - -  - - - -  - - - -  - - - -  - - - -  - - - -  - - - -
// CLASSES (ES6)
// - - - -  - - - -  - - - -  - - - -  - - - -  - - - -  - - - -  - - - -

// Basic class
class Animal {

    constructor(attrs) {
        this.name = attrs.name;
        this.sound = attrs.sound;
    }

    get describe () {
        return animalSpeak(this.name, this.sound);
    }
}

{
    let cow = new Animal({name: 'cow', sound: 'moo'});
    let expected = 'A cow says moo.';
    console.assert(expected === cow.describe, `Unexpected value: ${cow.describe}`);
}

// Class inheritance
class Penguin extends Animal {
    constructor() {
        super({name: 'penguin', sound: 'very little'});
    }
    waddle = () => console.log('(waddles around cutely)');
}

{
    let penguin = new Penguin();
    let expected = 'A penguin says very little.';
    console.assert(expected == penguin.describe, `Unexpected value: ${penguin.describe}`);
    penguin.waddle();
}

// - - - -  - - - -  - - - -  - - - -  - - - -  - - - -  - - - -  - - - -
// DESTRUCTURING (ES6)
// - - - -  - - - -  - - - -  - - - -  - - - -  - - - -  - - - -  - - - -

// Object
{
    let { name, sound } = { name: 'horse', sound: 'neigh', snack: 'carrot' };
    let msg = animalSpeak(name, sound)
    console.assert('A horse says neigh.' === msg, `Unexpected value: ${msg}`);
}


// Array
{
    let [ name, sound ] = [ 'alpaca', '???', 'grass' ];
    let msg = animalSpeak(name, sound)
    console.assert('A alpaca says ???.' === msg, `Unexpected value: ${msg}`);
}

// - - - -  - - - -  - - - -  - - - -  - - - -  - - - -  - - - -  - - - -
// LET & CONST (ES6)
// - - - -  - - - -  - - - -  - - - -  - - - -  - - - -  - - - -  - - - -
let x = 1;

{
    let x = 2;
    console.assert(x == 2, `Unexpected value: ${x}`);
}

console.assert(x == 1, `Unexpected value: ${x}`);

// - - - -  - - - -  - - - -  - - - -  - - - -  - - - -  - - - -  - - - -
// PROMISES (ES6)
// - - - -  - - - -  - - - -  - - - -  - - - -  - - - -  - - - -  - - - -
function asyncDouble(x, time = 100) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            //console.log(`${x} => ${x * 2}`);
            resolve(x * 2);
        }, time);
    });
}

function asyncFailed(x, time = 100) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                throw new Error("internet connection lost");
            } catch (e) {
                reject(e);
            }
        }, time);
    });
}

// Simulate all successes
asyncDouble(1) // 2
    .then(x => asyncDouble(x)) // 4
    .then(x => asyncDouble(x)) // 8
    .then(x => console.assert(8 === x, `Unexpected value: ${x}`))
    .catch(e => console.error(e));

// Simulate errors
asyncDouble(1) // 2
    .then(x => asyncDouble(x)) // 4
    .then(x => asyncFailed(x)) // error
    .then(x => console.assert(8 === x, `Unexpected value: ${x}`)) // shouldn't reach
    .catch(e => console.error(`Expected error: ${e.message}`));

// Wait for all to complete
Promise.all([ asyncDouble(1), asyncDouble(1), asyncDouble(2) ])
    .then(
        x => console.assert(arrayShallowEquals([2, 2, 4], x), `Unexpected value: ${x}`),
        err => console.error(err)
    );

// Wait for first to succeed
// Note: not available in Node v14.17.2
// Promise.any([ asyncDouble(1), asyncDouble(2), asyncDouble(4, 0) ])
//     .then(
//         x => console.assert(8 === x, `Unexpected value: ${x}`),
//         err => console.error(err)
//     );

// Wait for first to succeed
Promise.race([ asyncDouble(1), asyncDouble(2), asyncDouble(4, 0) ])
    .then(
        x => console.assert(8 === x, `Unexpected value: ${x}`),
        err => console.error(err)
    );

// Wait for first to fail
Promise.race([ asyncDouble(1), asyncDouble(2), asyncFailed(4, 0) ])
    .then(
        x => console.assert(false, `Should not reach here: ${x}`),
        e => console.error(`Expected error: ${e.message}`)
    );

// - - - -  - - - -  - - - -  - - - -  - - - -  - - - -  - - - -  - - - -
// ASYNC AWAIT (ES6)
// - - - -  - - - -  - - - -  - - - -  - - - -  - - - -  - - - -  - - - -
async function foo() {
    try {
        let x = await asyncDouble(1); // 2
        x = await asyncDouble(x); // 4
        x = await asyncDouble(x); // 8
        console.assert(8 === x, `Unexpected value: ${x}`);
    } catch(e) {
        console.error(e);
    }
}

foo(); // async function returns Promise

// - - - -  - - - -  - - - -  - - - -  - - - -  - - - -  - - - -  - - - -
// REST & SPREAD OPERATOR (ES6)
// - - - -  - - - -  - - - -  - - - -  - - - -  - - - -  - - - -  - - - -
function multiply(x, ...y) {            // <--- rest operators
    return y.reduce((a, b) => a*b, x);
}

let tests = [ [[2], 2], [[2,3], 6], [[2,2,2,2,2],32] ];
tests.forEach(([test, expected]) => {
    let result = multiply(...test);     // <--- spread operator
    //console.log(`${expected} != ${result}`);
    console.assert(expected === result, `${expected} != ${result}`);
});

// - - - -  - - - -  - - - -  - - - -  - - - -  - - - -  - - - -  - - - -
// worker_threads (Node 10.5+)
// - - - -  - - - -  - - - -  - - - -  - - - -  - - - -  - - - -  - - - -
const { Worker } = require('worker_threads');

var worker = new Worker('./pig-latin-chatbot.js');

function sendChat(msg) {
    console.log(`You: ${msg}`);
    worker.postMessage(msg);
}

worker.on('message', msg => console.log(`Chatbot: ${msg}`));
worker.on('exit', (code) => console.log('(the chatbot left.)'));
sendChat('Hi there!');
sendChat('What are you up to?');
sendChat('quit');
