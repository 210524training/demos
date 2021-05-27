// JavaScript supports asynchronous operations

// We can delegate certain methods to the web apis (node apis).
// In the browser, examples would be setTimeout, setInterval, AJAX

// In Node.js, we have interactions with the filesystem, prompting the terminal for input
// reading/writing to files
//          - Also has a synchronous


// In addition these APIs, we can create our own asynchronous operations

// JavaScript has a class called a "Promise"
// Which represents an asynchronous operation
// It is a "promise" that some action will occur, which will invoke a given callback function

let promise = new Promise(
    (resolve, reject) => {
      // We have 2 inputs, called resolve and reject
      // By invoking these functions we finalize this Promise
      // invoking resolve, will cause the Promise to successfully complete
      // invoking reject, will cause the Promise to fail

      // This allows us to define whether our custom asynchronous operation
      // is successful or a failure under different scenarios

      // We can also additionally invoke other asynchronous operations, such as
      // setTImeout or similar

      // resolve(10); // Can optionally be given a parameter
      // A simple asynchronous operation that immediately succeeds

      // reject("Something went wrong"); // What if we reject instead?

      setTimeout(
      () => {
        resolve(10);
      }, 1000);
      // Resolve the promise with the value 10 after 1 full second
    }
);

// We can invoke methods on this Promise object to specify what actions should take place
// if the promise were to succeed or fail

// .then() & .catch()
// .then() is given a callback function that is executed only if the promise succeeds (or "resolves")
// .catch() is given a callback function that is executed only if the promise fails (or "rejects")

// promise
// .then(
//     (input) => input + 1
// ).then(
//     (input) => console.log(input)
// ).then(
//     (input) => console.log(input)
// ).catch(
//     (error) => console.log(error)
// );

// What if we need to start a 2nd asynchronous operation with access to the information from the first?
// Inside our .then(), we must create another Promise, and invoke .then() and .catch()
// However, you might predict that this gets a little messy

// ES7 introduced the async keyword and await keywords
// The 'async' keyword is used before a function declaration (async function() {...} or async () => {...})
// Functions that are declared as 'async' automatically are changed to return a Promise
// Inside 'async' functions, we have access to the 'await' keyword
// 'await' can be used on Promises
// This turns the remainder of the function into a callback function (effectively unwrapping the nested callback chaining)

// promise
// .then(
// async (input) => {
//   let response;

//   let promise2 = new Promise( (resolve, reject) => {
//       resolve(15);
//   }).then(
//       (data) => {
//           let response = data;
//       }
//   ).catch(
//       (message) => {let response = 1}
//   );
// }).then(
//     (input) => console.log(input)
// ).then(
//     (input) => console.log(input)
// ).catch(
//     (error) => console.log(error)
// );

async function process() {
  try {
    let response1 = await promise;
    // We say that we "await" the promise
    // The rest of this "process" function would be converted into a callback function and attached to a .then call
    // If the promise were to reject, then the await keyword will throw an error, that we can catch

    console.log(response1);

    let response2 = await new Promise( (resolve, reject) => setTimeout(() => resolve(15), 2000));
    // Resolve with the value 15 after 2 seconds

    console.log(response1 + response2);

  } catch(error) {
    console.log(error);
  }
}

process();