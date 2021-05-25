// When you declare variables in JavaScript with the 'var' keyword, it will be 'hoisted' to the top of its scope
// The variable will be 'declared' before you actually use it, however its value will be 'undefined'

console.log(a);

var a = 55; // This variable will be hoisted to the top of its scope
// Since its scope is global scope, it will be hoisted to the top of this module

// console.log(b);
// This is not the same behavior as printing a hoisted variable


function myFunc() {
    console.log(c);

    var c = 'Hello there!';
    // Hoisted to the top of its function, because it is function scope

    if(isNaN('hello')) {
        var d = 'something';
        // Still function scope
        // Hoisted to the same place as c

        let d2 = 'something';
    }

    console.log(d);
    // console.log(d2);
    // d2 gives a ReferenceError
    // Variables declared with let and const follow block-scoping
    // And are NOT hoisted
}

myFunc();

// console.log(c);
// This gives a ReferenceError

// console.log(f);
// Gives a ReferenceError since the variable f is NOT hoisted

let f = 'my variable';

// Due to these characteristics, you should ALWAYS use let or const, and NEVER use 'var'