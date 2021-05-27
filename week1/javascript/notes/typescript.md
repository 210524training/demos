# TypeScript

TypeScript is a High-Level Programming Language. It is Statically Typed. It is a Superset of JavaScript.

## Superset

If you imagine JavaScript is a circle like a venn diagram. TypeScript is a bigger circle that completely encapsulates JavaScript.
Everything that JavaScript is also exists in TypeScript. Except TypeScript has additional features that JavaScript does not.

The biggest feature, and is the namesake for the language, is that TypeScript is statically typed.

## Static Typing

What is it? Why is it good?

Opposite of Dynamically typed. You must declare the type of a variable when it is declared, and it cannot change.

It provides Type-Safety. Thinking of working with JavaScript, you never know what type of variable you're receiving.

You might expect it to be a string, but maybe it's a function. Even if a variable was a string when it was declared,
because JavaScript is dynamically typed, that variable could have been reassigned to a function. Maybe someone accidentally
left off the parentheses when trying to invoke a function. In JavaScript, that does not give an error.
Even if it was not intentional. The time spent tracking down the root cause of this directly translates to lost money.
The less time we spend dealing with issues in regards to types, the more money we save.

TypeScript is therefore statically typed, so variables cannot change types. We will be informed through the use
of our TypeScript Compiler (or language syntax Linters) that a variable was reassigned to an incorrect type.

Before we even attempt to run the program, we have already found and fixed that issue.

Additionally, the use of types gives us the ability to know at compile time the requirements for a function, for example.
Our IDEs can give us popups (intellisense) to tell us what the requirements are for functions that are either built in or imported.

This can save a large amount of time especially when working with third-party libraries.

## Other features

TypeScript additionally has features to support static typing such as: interfaces, abstract classes, decorators (annotations in Java), access modifiers, etc.

## Using TypeScript in practice

JavaScript is nice and convenient because it can be run/executed by practically any browser (you do have to keep in mind the specific
version supported, but generally that's not too hard).
Additionally, we have Node.js to support server-side runtimes.

TypeScript cannot be interpreted by Node.js OR any browser. The way we work is by transpiling TypeScript into JavaScript.
Then Node.js or the browsers execute that JavaScript.

### How to transpile

When you install TypeScript, it comes with the TypeScript compiler, `tsc`.
So you would use the `tsc` CLI.