export let myObj = {
    key1: false,
    key2: 55,
    key3: 'Hello there!',
    key4: function() {
        console.log('This is my function');
    },
};
// We can declare objects with the above syntax, which is referred to as "Object Literals"
// It uses curly braces and contains key value pairs, separated by colons
// Each key-value pair is separated by a comma
// We are optionally allowed to have trailing commas (they don't do anything)

myObj.key4();

console.log(myObj.key2);

// JavaScript supports what is called "prototypal inheritance" instead of class-based inheritance.

console.log(myObj);

console.log(typeof myObj);
console.log(typeof myObj.key4);

export function Person(name, age) {
    this.name = name;
    this.age = age;
    this.talk = function() {
        console.log(`Hi my name is ${this.name} and I am ${age} years old`);
    }
}

let larry = new Person("Larry", 25);

larry.talk();

console.log(larry);

console.log(larry instanceof Person);

function Student(name, age, degree) {
    this.constructor(name, age);
    this.degree = degree;
    this.talk = function() {
        console.log(`Hi my name is ${this.name} and I am ${age} years old and I am majoring in ${degree}`);
    }
}
Student.prototype = new Person();
Student.prototype.constructor = Person;

let john = new Student("John", 25, "Business");

console.log(john);
john.talk();

console.log(john instanceof Student);
console.log(john instanceof Person);

class Student2 extends Person {
    degree = '';

    constructor(name, age, degree) {
        super(name, age);
        this.degree = degree;
    }
}

export let chad = new Student2("Chad", 23, "Finance");

console.log(chad);

chad.talk();

console.log(chad.__proto__); // This refers to an INSTANCE of an object that is the "parent" object
// We say this object is a "prototype" of the proto object

console.log(Student2.prototype);

Person.prototype.meow = function() {
    console.log("Meow!");
}

chad.meow();

// let person2 = Person("Jeff", 72);
// If I "forget" the new keyword
// What happens?

// console.log(person2);

// console.log(name);
// console.log(age);

// This does throw an Error (Yay!)
// let student2 = Student2("Jeff2", 722, "Business");

console.log(chad.__proto__.__proto__.__proto__);
// At the top of all prototypal inheritance chains is the global prototype object
// ALL JavaScript objects inherit from this global object
// Even including Object Literals

let obj = {};

obj.__proto__.meow = function() {
    console.log("Meow!");
}
// By doing this, ALL objects can now meow

obj.meow();
myObj.meow();

// Quite dangerous, DO NOT MODIFY THE GLOBAL JS OBJECT
