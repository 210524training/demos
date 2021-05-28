# Testing

Verifying that the application is functioning *as intended*. We have an idea what the application _should_ do, and we match that against reality. We don't always perfectly implement our ideas.

The use of a testing library allows us to automate testing to steadily expand the scope of scenarios that your application operates in.

If we only test our application code manually, we will quickly find that when our application is facing real users, something you didn't think of will occur, and the application will shut down.

By automating our tests we never "forget" about possible scenarios, and only continue to refine our expectations about how the application should function.

## Testing preemptively

Test early, test often. If possible, test before you write your code.

## Test Driven Development (TDD)

1. Write a test
2. Run the test, watch it fail
3. Write code to make the test pass
4. Run the test, if it still doesn't pass, go back to #3

This forces you to plan ahead about what a function or class needs to be capable of.
In TDD, you write function or method stubs (empty functions) and then you write the tests for that.
Finally you implement the function to make all of the tests pass.

## Unit Testing

Testing the smallest "unit" of our application. Generally means every function when using JavaScript. A larger unit might be an entire module, which is more difficult to test.

### Other Testing categories

Integration Tests, System Tests, End-To-End Tests (e2e), User Acceptance Tests.

Functional vs Non-Functional Tests, e.g Performance Tests

## Key Terms

### Expectations/Assertions

We expect the code to behave in a specific way under certain conditions. If the code does not behave in that way, the test fails.
We can assert that the code behaves in a specific manner, if it does not, then the test fails.

## Mocking

We can create fake data or fake responses for certain use-cases in our tests. In particular, we generally replace real aspects
of our code with this fake data/response. We refer to them as "mocks".

## Independence

Unit tests should be independent from one another. If one test alters the state of the program in such a way that it influences another test, we can't say with confidence that the 2nd test would have passed otherwise.

If tests were affecting each other it would make it more difficult to identify where the source of the problem lies.

## Test Coverage

A way to measure how much of your application code is "covered" or affected by (or maybe used by) tests.
It's a helpful measurement, but it isn't necessarily the only important detail.

For example, test coverage does indicate how well you have covered the different scenarios for a single unit.
Test coverage would simply indicate that at least 1 scenario was covered for a particular unit.

We do break down test coverage to help identify these situations:
- Function coverage: Every function is tested
- Line Coverage: Every line of code is tested
- Statement Coverage: Every code statement is tested
- Branch coverage: Every branch of flow-control is tested

Even despite this, test coverage still does not indicate the success/quality of your tests.

For example, if you have an add function, that is tested only against positive numbers, it might show as 100% covered even for all branches, however, the function may not actually work for negative values.

As such, it is not necessarily worthwhile to chase 100% test coverage.

## Jest

A unit testing framework for JavaScript that attempts to be as human-readable as possible.
As such, many of its functions are named in such a way, that when chained together, they form sentences.

## Methods/Objects
- `expect` - Assert that something is as we expect
- `test` or `it` - A function that runs a test
- `beforeEach` - A function that runs before each test
    - Helpful to organize mock data/responses or clean up program state to have independent tests
- `afterEach` - A function that runs after each test
- `beforeAll` - A function that runs first, before all tests
- `afterAll` - A function that runs last, after all tests
- `describe` - Creates a group of tests that all have the same setup
