// We have 3 logical operators

// && -> AND
// || -> OR
// ! -> NOT

// However, && and || can be used in more advanced ways
// They have other names when used in these other manners

// Works in conjunction with the idea of truthy & falsey

// The && operator would be called the "Guard" Operator

let myVar = 'Larry';

let guarded = myVar && 'something-else';
// This will check the truthy/falsey value of myVar
// If myVar is falsey, we will use myVar
// If myVar is truthy, we will use the 2nd argument

console.log(guarded);

let guarded2 = 0 && myVar;
console.log(guarded2);

// The || operator is called the 'Default' Operator and it works in the inverse manner

let default1 = myVar || 'something-else';
console.log(myVar);

let default2 = 0 || myVar;
console.log(default2);

let someValue = undefined;

let default3 = someValue || 5;

console.log(default3);

let obj = {
    name: "Larry",
    age: 55
}

let obj2 = undefined;

let age = obj && obj.age;
console.log(age);

let age2 = obj2 && obj2.age;
console.log(age2);

console.log(obj2.age);