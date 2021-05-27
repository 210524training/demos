// A "Thunk" in JavaScript is a function that take no parameters and return something
// The use-case is to delay computing some value or delay some functionality

// In our previous Closure example, the nested "inner" function would be our "Thunk"
let closure = function() {
    var favoriteNumber = 4;
    var favoriteColor = 'Blue';
    var favoriteSeason = 'Summer';

    return function thunk() {
        // Inside the inner function, we still have access to
        // the variables declared in the outer scopes
        // We do have access to favoriteNumber, favoriteColor, and favoriteSeason
        var favoriteFood = 'Hot Dogs';

        console.log(favoriteNumber);
        console.log(favoriteColor);
        console.log(favoriteSeason);
        console.log(favoriteFood);

        // We can perhaps modify the favoriteNumber, Color, and Season variables
        // And as long as we can only access them through the inner function
        // We will have effectively "encapsulated" them

        favoriteNumber++;
        favoriteColor = (favoriteColor === 'Blue') ? 'Green' : 'Blue';
        // The statement above will swap back and forth between 'Blue' and 'Green'
        // It uses the ternary operator
        favoriteSeason = (favoriteSeason === 'Summer') ? 'Spring' : 'Summer';
        favoriteFood = (favoriteFood === 'Hot Dogs') ? 'Ceasar Salad' : 'Hot Dogs'
    }
}

// Why would we want to use "Thunks"?

// One idea is that we can return different functions based on the input


// If you wanted to put out a different function based on if the input was an array or a single string
// And we can potentially sort the array
// If our input is just a string, we can check if that happens to be a number
// If it is, our thunk will be a function that would multiply the value by 2
function outer(input) {
// Our input will be a string or an array of strings

    // console.log(typeof input);
    // typeof will tell us the input is an object if it is an array
    // otherwise, it will likely tell us that input is a string

    if(typeof input === 'object') {
        return function(arr) {
            return arr.sort( (a, b) => a.localeCompare(b));
        }
    } else if(typeof input === 'string') {
        return function(str) {
            if(Number(str) !== NaN) {
                return Number(str) * 2;
            }

            return NaN;
        }
    }

    // If the input was not an array or a string
    // Return a thunk that does nothing
    return () => {};
}

let input = ['string2', 'string1'];

let sort = outer(input);

console.log(sort(input));

let multiply = outer("Doesn't need to be a number -- Just needs to be a string");

console.log(multiply("5"));

// ==============================================================================

function subtract(x, y) {
    return x - y;
}

function thunk() {
    return subtract(50, 21);
    // This is not going to return a function
    // This will return a number
}

// This allows us to delay the invocation of the subtract function
// This would be helpful in particular if we didn't know what the inputs are supposed to be yet

console.log(thunk()) // Only after invoking thunk(), will subtract be called
// Output 29

// In conjunction with the idea of closures, we can store data temporarily (cache data)

function thunk2() {
    let now = Date.now();
    // This should be the current time in ms

    let value = 0;

    // Something will take 2 seconds to complete
    // This structure is technically blocking
    // This would be refactored to be asynchronous
    while(Date.now() <= now + 2000) {
        value = Date.now(); // Making up some random data
     }
    // Let's pretend we got some data back in response

    return subtract(Date.now(), value);
}

// By invoking this new thunk, we delay the computation until after we get some data
console.log(thunk2());