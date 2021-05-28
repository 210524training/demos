import * as input from './input';
// This gives us an object called 'input'
// that has a field for every exported item from the input module

beforeAll(() => {
  console.log('This will run before every test');
});

describe('A group of tests', () => {
  beforeEach(() => {
    console.log('This will run before each test in this group');
  });

  test('My very first test', () => {
    console.log('Test 1');
    expect(true).toBe(true);
  });

  it('My second test', () => {
    console.log('Test 2');
    expect(false).toBe(false);
  });
});

describe('Input Module', () => {
  afterAll(() => {
    input.rl.close();
  });

  describe('initialPrompt', () => {
    test('should resolve with the answer when provided a valid input', async () => {
      const responseOptions = ['0', '1', '2', 'q'];
      const randomIndex = Math.floor(Math.random() * responseOptions.length);
      const validInput = responseOptions[randomIndex];

      input.rl.question = jest.fn().mockImplementationOnce(
        (questionText, answer) => answer(validInput),
      );

      await expect(input.initialPrompt()).resolves.toBe(validInput);
    });

    test('should reject when provided an invalid input', async () => {
      // Obtained from stack-overflow
      // The goal is to generate a random string that consists of
      // digits and letters of a certain length
      const randomlength = Math.floor(Math.random() * 5 + 2);
      // Generate a random string length between 2 and 7 characters

      // This will be a random string of digits and letters
      // That is of length 2 - 7

      // Which should be invalid input for initialPrompt
      const invalidInput = Math.random().toString(36).substring(randomlength);

      input.rl.question = jest.fn().mockImplementationOnce(
        (questionText, answer) => answer(invalidInput),
      );

      await expect(input.initialPrompt()).rejects.toBeUndefined();
    });
  });
});
