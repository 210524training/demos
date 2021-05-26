// A "Thunk" in JavaScript is a function that returns another function

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