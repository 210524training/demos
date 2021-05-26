# JavaScript Event Loop

We have discussed before that JavaScript is Single-Threaded. It was invented for the client-side to provide dynamic features to webpages.

How can JavaScript simultaneously provide dynamic features while still allowing input from the user or rendering animations, or what have you, if there is only 1 Thread?

## JavaScript Architecture

Like most programming languages, JavaScript has a stack and a heap. In languages that do support multiple threads, each thread would get their own stack.

### Heap

A portion of memory. Acts as a storage area for objects. Not necessarily for all variables. The rest of the variables are stored on the stack.
The heap is considered to be unstructured. Hence the name, heap.

### Stack

AKA Call Stack.
An ordered/structured portion/region of memory. It follows a Stack structure. A "Stack" is a technical term to describe a First In, Last Out Data Structure.

Thinking of Stacks in the real world, like a stack of plates. In general, you add plates to the top, and you take plates from the top.
Let's say, you add 50 plates in a row (All of the interactions can only be 1 plate at a time). The very first plate that was added is now at the bottom. Since you can only take plates off the top, the first plate that was added will be the last plate to be removed.

First In, Last Out is equivalent to Last In, First Out (FILO or LIFO are the same).

Thinking in terms of a computer's memory, what are the things being added to this Stack?
In general, each function call will be added to the stack as a "Stack Frame".
Variables in that function scope, will be stored in that stack frame.

If you have functions that call other functions, which call other functions, they get added to the stack in this First In, Last Out process.

If functionA calls functionB, then functionB must finish first.

```javascript
function functionB() {
    // Do some stuff
}

function functionA() {
    functionB();
}

functionA();
```

When the stack is empty, then we have finished execution. In terms of client-side execution, the website doesn't just exit. Instead, JavaScript will wait for further instructions.

## Web APIs

There are certain built in functions, that are provided by the browser themselves (or Node.js).
Some examples: `setTimeout`, `setInterval`, AJAX (which allows to send HTTP requests over the network).

Each Web API has its own thread. So JavaScript will delegate processes to these Web APIs. Then, that function call will be removed from JavaScript's Stack. And JavaScript will keep running.

In these other threads, the requested action will continue to process, eventually completing.
In general, we attach what are called "Callback functions" to the use of these web APIs.

When the web API completes, it adds that callback to something called the "Event Queue" or "Callback Queue".

Queues are another popular data structure, which is First In, First Out (the opposite of a Stack).
Think about lines at a bank. The first person into the line, will be the first person out of the line.
There's no cutting in line.

Whenever JavaScript's Call Stack is empty, JavaScript will take the top of the Event Queue and add it to its Stack.

This overall architecture is referred to as The "Event Loop".