// Closure

function outer() {
    var favoriteNumber = 4;
    var favoriteColor = 'Blue';
    var favoriteSeason = 'Summer';

    function inner() {
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
    }

    return inner;
}

// inner();
// Throws an Error, since inner is only visible inside the scope of the outer() function

let favorites = outer();
// I now have access to the ability to invoke the inner function without invoking the outer function

favorites();

// We are not quite fully encapsulated because we still have access to the outer function
// Instead, we can declare the outer function as an anonymous function so that we can not access it ever again
// Forcibly encapsulate the variables

let closure = function() {
    var favoriteNumber = 4;
    var favoriteColor = 'Blue';
    var favoriteSeason = 'Summer';

    function inner() {
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

    return inner;
}

closure = closure();
// We reassign closure with the return value
// This means closure the variable is now referring to the inner function
// And the outer function is lost forever

closure();
// This is now invoking the inner function, which will print our favorite info.
closure();
closure();

// We can see that favoriteNumber, favoriteColor, and favoriteSeason are changing
// But favoriteFood is staying the same

// Why do we think that is?

// favoriteFood is declared inside the inner function, and so gets redeclared every time
// we call the inner function

// Through the use of these closures, we have been able to accomplish Encapsulation in JavaScript