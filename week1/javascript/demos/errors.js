console.log(-5 / 0);
console.log(-5 / Infinity);

console.log(5 / "hello");
// Semicolons punctuating statements are optional (but it is a very good habit, due to some issues)
// Particularly when we get into React with the use of JSX, there are sometimes issues with JS semicolon-injection process

console.log(5 / "6");

try {
    consol.log("Hi there!");
} catch(error) {
    console.log(typeof error);

    console.log(error.message);
    console.log(error.name);
    // console.log(error.lineNumber); // undefined
    // console.log(error.columnNumber); // undefined
    // console.log(error.fileName); // undefined
    // The above 3 are undefined because they are non-standard fields of ReferenceError
    // In particular, they most likely only show up, client-side when you're using Mozilla
    // Since we are using Node.js, we don't have them
    console.log(error.stack);
    
    console.log(error);
}

try {
    throw new Error("My custom message");
} catch(error) {
    console.log(error);
} finally {
    console.log("Hi there! =D");
}

// Why is this important?
// You want to properly handle errors

// But isn't it better to avoid them or prevent them from happening?
// Errors are unavoidable

// Classically, user input is a large source of errors
// Users almost never want to do things correctly

// If it is possible for something to go wrong, it will

// It is inevitable that something unexpected WILL happen
// It is important to address these potential scenarios
// So that your program can respond accordingly

// There is a bit of a balancing act to be had
// Sometimes, attempting to handle all possible scenarios
// will clutter the codebase more than it will help improve stability
// Sometimes, people will leave errors unhandled, and just allow them
// to crash the program

class HttpError extends Error {
    constructor(message, status) {
        message += `; status-code: ${status}`; 
        super(message);
        this.status = status;
    }
}

throw new HttpError("Request was bad", 404);