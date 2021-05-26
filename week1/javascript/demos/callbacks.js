// In some languages, functions are these special constructs that are different from regular objects
// This is not the case in JavaScript

// Functions are just objects
// And due to this, they can be passed around just like objects

// We saw this already in the Closure example, where we returned the inner function object

// But we can also pass functions in as parameters to other functions, these are referred to as "callback" functions

function myFunc(someData, callback) {
    // We use the provided callback function
    // by invoking it
    callback(someData);
    // We can optionally invoke it with some parameters
}
// JavaScript does not offer any guarantees about what # of parameters or types of parameters that the callback would need
// This would have to kept track of yourself

function log(data) {
    console.log(data);
}

myFunc('Hello World!', log);

function log2() {
    console.log("Hi there!");
}

myFunc("Larry says Hello", log2);
// The log2 function doesn't use any parameters
// myFunc will still pass the data in to log2, but it will end up unused
// It does not throw an errors

// Callbacks are often used in conjunction with arrow functions to make the syntax easy to understand

function delegate(data1, data2, callback) {
    callback(data1, data2);
}

delegate(5, 4, (data1, data2) => console.log(data1 + data2));