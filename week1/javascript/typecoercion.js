let myNumber = Number('something');

console.log(myNumber);

console.log(typeof NaN);

// In JavaScript values can be "coerced" into other types

// For example
console.log(5 == '5');
// This will coerce the value on the right to be the type of the value on the left, and then they will be compared
// The string '5' can be turned into just the number 5

console.log('true' == true); // Not exactly sure why this isn't working

console.log(!!'true'); // true
console.log(!!''); // false

// The terminology JS uses for converting into booleans is "truthy" and "falsey"

// This returned false
// But, strings CAN be converted into booleans
// The means by which that happens is not 'true' -> true or 'false' -> false

// Instead
// The empty string '' is coerced into false
// And all other strings are converted into true

// The === operator compares both the values and the types of the operands
// The only way the result is true, if they are both the same type and the same value
// It will NOT perform any type coercion
console.log(5 === '5'); // false

console.log(Boolean('true') === true); // true

console.log(String(5) === '5'); // true