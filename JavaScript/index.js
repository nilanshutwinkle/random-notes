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
// DATES (ES5)
// - - - -  - - - -  - - - -  - - - -  - - - -  - - - -  - - - -  - - - -

console.log(Date.now());

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
// Datetime string formatting, parsing strings
// - - - -  - - - -  - - - -  - - - -  - - - -  - - - -  - - - -  - - - -

// - - - -  - - - -  - - - -  - - - -  - - - -  - - - -  - - - -  - - - -
// REGEX
// - - - -  - - - -  - - - -  - - - -  - - - -  - - - -  - - - -  - - - -

// - - - -  - - - -  - - - -  - - - -  - - - -  - - - -  - - - -  - - - -
// WRITING, READING FILES
// - - - -  - - - -  - - - -  - - - -  - - - -  - - - -  - - - -  - - - -

// - - - -  - - - -  - - - -  - - - -  - - - -  - - - -  - - - -  - - - -
// WebWorkers
// - - - -  - - - -  - - - -  - - - -  - - - -  - - - -  - - - -  - - - -

// - - - -  - - - -  - - - -  - - - -  - - - -  - - - -  - - - -  - - - -
// TESTING
// - - - -  - - - -  - - - -  - - - -  - - - -  - - - -  - - - -  - - - -
