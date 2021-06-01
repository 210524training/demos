/* eslint-disable import/no-extraneous-dependencies */
import RandExp from 'randexp';
import Item, { Position } from '../../models/item';
import * as utils from '../../utils/inpututils';
import inventoryService from '../inventory/inventoryService';
import * as prompt from './prompt';

describe('Within the Prompt Module', () => {
  afterAll(() => {
    utils.rl.close();
  });

  describe('initialPrompt', () => {
    test('should resolve with the answer when provided a valid input', async () => {
      const responseOptions = ['0', '1', '2', 'q'];
      const randomIndex = Math.floor(Math.random() * responseOptions.length);
      const validInput = responseOptions[randomIndex];

      jest.spyOn(utils.rl, 'question').mockImplementationOnce(
        (questionText, answer) => answer(validInput),
      );

      await expect(prompt.initialPrompt()).resolves.toBe(validInput);
    });

    test('should reject with an error when provided an invalid input', async () => {
      // This will be a random string of digits and letters
      // That is at least 2 characters long
      const invalidInput = new RandExp(/^[a-zA-Z0-9]{2,}$/).gen();

      jest.spyOn(utils.rl, 'question').mockImplementationOnce(
        (questionText, answer) => answer(invalidInput),
      );

      await expect(prompt.initialPrompt()).rejects.toBeInstanceOf(Error);
    });
  });

  describe('customerPrompt', () => {
    test('should resolve with the answer when provided a valid input', async () => {
      const responseOptions = ['0', '1', '2', 'q'];
      const randomIndex = Math.floor(Math.random() * responseOptions.length);
      const validInput = responseOptions[randomIndex];

      jest.spyOn(utils.rl, 'question').mockImplementationOnce(
        (questionText, answer) => answer(validInput),
      );

      await expect(prompt.customerPrompt()).resolves.toBe(validInput);
    });

    test('should reject with an error when provided an invalid input', async () => {
      const invalidInput = new RandExp(/^[a-zA-Z0-9]{2,}$/).gen();

      jest.spyOn(utils.rl, 'question').mockImplementationOnce(
        (questionText, answer) => answer(invalidInput),
      );

      await expect(prompt.customerPrompt()).rejects.toBeInstanceOf(Error);
    });
  });

  describe('employeePrompt', () => {
    test('should resolve with the answer when provided a valid input', async () => {
      const responseOptions = ['0', '1', '2', '3', 'q'];
      const randomIndex = Math.floor(Math.random() * responseOptions.length);
      const validInput = responseOptions[randomIndex];

      jest.spyOn(utils.rl, 'question').mockImplementationOnce(
        (questionText, answer) => answer(validInput),
      );

      await expect(prompt.employeePrompt()).resolves.toBe(validInput);
    });

    test('should reject with an error when provided an invalid input', async () => {
      const invalidInput = new RandExp(/^[a-zA-Z0-9]{2,}$/).gen();

      jest.spyOn(utils.rl, 'question').mockImplementationOnce(
        (questionText, answer) => answer(invalidInput),
      );

      await expect(prompt.employeePrompt()).rejects.toBeInstanceOf(Error);
    });
  });

  describe('queryUsername', () => {
    test('should resolve with the input', async () => {
      const response = new RandExp(/^[a-zA-Z0-9]{2,}$/).gen();

      jest.spyOn(utils.rl, 'question').mockImplementationOnce(
        (questionText, answer) => answer(response),
      );

      await expect(prompt.queryUsername()).resolves.toBe(response);
    });
  });

  describe('queryPassword', () => {
    test('should resolve with the input', async () => {
      const response = new RandExp(/^[a-zA-Z0-9]{2,}$/).gen();

      jest.spyOn(utils.rl, 'question').mockImplementationOnce(
        (questionText, answer) => answer(response),
      );

      await expect(prompt.queryPassword()).resolves.toBe(response);
    });
  });

  describe('confirmPassword', () => {
    test('should resolve with true if the input matches', async () => {
      const password = new RandExp(/^[a-zA-Z0-9]{2,}$/).gen();

      jest.spyOn(utils.rl, 'question').mockImplementationOnce(
        (questionText, answer) => answer(password),
      );

      await expect(prompt.confirmPassword(password)).resolves.toBe(true);
    });

    test('should resolve with false if the input does not match', async () => {
      const response = new RandExp(/^[a-zA-Z0-9]{2,}$/).gen();
      const password = new RandExp(/^[a-zA-Z0-9]$/).gen();

      jest.spyOn(utils.rl, 'question').mockImplementationOnce(
        (questionText, answer) => answer(response),
      );

      await expect(prompt.confirmPassword(password)).resolves.toBe(false);
    });
  });

  describe('queryBalance', () => {
    test('should resolve with the input if it is a number', async () => {
      const amount = new RandExp(/^[0-9]*(\.[0-9]*)?$/).gen();

      jest.spyOn(utils.rl, 'question').mockImplementationOnce(
        (questionText, answer) => answer(amount),
      );

      await expect(prompt.queryBalance()).resolves.toBe(Number(amount));
    });

    test('should reject if the input is not a number', async () => {
      const invalidNumber = new RandExp(/^[a-zA-Z]+$/).gen();

      jest.spyOn(utils.rl, 'question').mockImplementationOnce(
        (questionText, answer) => answer(invalidNumber),
      );

      await expect(prompt.queryBalance()).rejects.toBeInstanceOf(Error);
    });
  });

  describe('queryProductName', () => {
    const name = new RandExp(/^[a-zA-Z0-9]*$/).gen();

    test('should resolve with the input if the product name is new', async () => {
      jest.spyOn(utils.rl, 'question').mockImplementationOnce(
        (questionText, answer) => answer(name),
      );

      jest.spyOn(inventoryService, 'getByName').mockReturnValueOnce(undefined);

      await expect(prompt.queryProductName()).resolves.toBe(name);
    });

    test('should reject if the product name is taken', async () => {
      jest.spyOn(utils.rl, 'question').mockImplementationOnce(
        (questionText, answer) => answer(name),
      );

      jest.spyOn(inventoryService, 'getByName').mockReturnValueOnce(new Item());

      await expect(prompt.queryProductName()).rejects.toBeInstanceOf(Error);
    });
  });

  describe('queryProductPrice', () => {
    test('should resolve with the input if it has up to 2 decimal places', async () => {
      const price = Number(new RandExp(/^[1-9][0-9]{0,13}(\.[0-9]{1,2})?$/).gen());

      jest.spyOn(utils.rl, 'question').mockImplementationOnce(
        (questionText, answer) => answer(String(price)),
      );

      await expect(prompt.queryProductPrice()).resolves.toBe(price);
    });

    test('should reject if the input has more than 14 whole number digits', async () => {
      const tooLargePrice = Number(new RandExp(/^[1-9]([0-9]){14,}(\.[0-9]{1,2})?$/).gen());

      jest.spyOn(utils.rl, 'question').mockImplementationOnce(
        (questionText, answer) => answer(String(tooLargePrice)),
      );

      await expect(prompt.queryProductPrice()).rejects.toBeInstanceOf(Error);
    });

    test('should reject if the input is not a number', async () => {
      const invalidInput = new RandExp(/^[a-zA-Z0-9]*[a-zA-Z]$/).gen();

      jest.spyOn(utils.rl, 'question').mockImplementationOnce(
        (questionText, answer) => answer(invalidInput),
      );

      await expect(prompt.queryProductPrice()).rejects.toBeInstanceOf(Error);
    });

    test('should round to 2 decimal places', async () => {
      const price = Number(new RandExp(/^[1-9][0-9]{0,13}\.[0-9]{3,}$/).gen());

      jest.spyOn(utils.rl, 'question').mockImplementationOnce(
        (questionText, answer) => answer(String(price)),
      );

      const roundedPrice = Math.round(price * 100) / 100;

      const result = await prompt.queryProductPrice();

      expect(result).toBe(roundedPrice);
    });
  });

  describe('queryProductPosition', () => {
    test('should resolve with the input if it is a valid position', async () => {
      const position = new RandExp(/^[A-F][0-9]$/).gen() as Position;

      jest.spyOn(utils.rl, 'question').mockImplementationOnce(
        (questionText, answer) => answer(position),
      );

      await expect(prompt.queryProductPosition()).resolves.toBe(position);
    });

    test('should reject if the input is not a valid position', async () => {
      const invalidPosition = new RandExp(/^[a-zA-Z0-9]{3}|[a-zA-Z0-9]{0,1}$/).gen() as Position;

      jest.spyOn(utils.rl, 'question').mockImplementationOnce(
        (questionText, answer) => answer(invalidPosition),
      );

      await expect(prompt.queryProductPosition()).rejects.toBeInstanceOf(Error);
    });
  });

  describe('queryProductStock', () => {
    test('should resolve with the input if it is a non-negative integer', async () => {
      const integer = Number(new RandExp(/^[0-9]*$/).gen());

      jest.spyOn(utils.rl, 'question').mockImplementationOnce(
        (questionText, answer) => answer(String(integer)),
      );

      await expect(prompt.queryProductStock()).resolves.toBe(integer);
    });

    test('should reject if the input is a negative integer', async () => {
      const integer = Number(new RandExp(/^-[0-9]*$/).gen());

      jest.spyOn(utils.rl, 'question').mockImplementationOnce(
        (questionText, answer) => answer(String(integer)),
      );

      await expect(prompt.queryProductStock()).rejects.toBeInstanceOf(Error);
    });

    test('should reject if the input is not a number', async () => {
      const invalidInput = new RandExp(/^[a-zA-Z][a-zA-Z0-9]*$/).gen();

      jest.spyOn(utils.rl, 'question').mockImplementationOnce(
        (questionText, answer) => answer(invalidInput),
      );

      await expect(prompt.queryProductStock()).rejects.toBeInstanceOf(Error);
    });
  });
});
