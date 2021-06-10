/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable import/no-extraneous-dependencies */
import RandExp from 'randexp';
import * as input from './input';
import * as prompt from '../prompt/prompt';
import * as utils from '../../utils/inpututils';
import Item, { Position } from '../../models/item';

describe('Within Input Module', () => {
  afterAll(() => {
    utils.rl.close();
  });

  beforeEach(() => {
    jest.spyOn(console, 'log').mockImplementation();
  });

  describe('registerPassword', () => {
    test('should resolve if the passwords matched', async () => {
      const password = new RandExp(/^[a-zA-Z0-9]{2,}$/).gen();

      jest.spyOn(prompt, 'queryPassword').mockResolvedValueOnce(password);
      jest.spyOn(prompt, 'confirmPassword').mockResolvedValueOnce(true);

      await expect(input.registerPassword()).resolves.toBe(password);
    });

    test('should reject if the passwords do not match', async () => {
      const password = new RandExp(/^[a-zA-Z0-9]{2,}$/).gen();

      jest.spyOn(prompt, 'queryPassword').mockResolvedValueOnce(password);
      jest.spyOn(prompt, 'confirmPassword').mockResolvedValueOnce(false);

      await expect(input.registerPassword()).rejects.toBeInstanceOf(Error);
    });
  });

  describe('queryProduct', () => {
    const name = new RandExp(/^[a-zA-Z0-9]*$/).gen();
    const price = Number(new RandExp(/^[0-9]*(\.[0-9]*)?$/).gen());
    const position = new RandExp(/^[A-F][0-9]$/).gen() as Position;
    const stock = Number(new RandExp(/^[0-9]*$/).gen());

    test('should resolve with the item if all of the inputs are valid', async () => {
      jest.spyOn(prompt, 'queryProductName').mockResolvedValueOnce(name);
      jest.spyOn(prompt, 'queryProductPrice').mockResolvedValueOnce(price);
      jest.spyOn(prompt, 'queryProductPosition').mockResolvedValueOnce(position);
      jest.spyOn(prompt, 'queryProductStock').mockResolvedValueOnce(stock);

      await expect(input.queryProduct()).resolves.toBeInstanceOf(Item);
    });

    test('should reject if the product name is already taken', async () => {
      jest.spyOn(prompt, 'queryProductName').mockRejectedValueOnce(new Error());

      await expect(input.queryProduct()).rejects.toBeInstanceOf(Error);
    });

    test('should reject if the product price is not a number', async () => {
      jest.spyOn(prompt, 'queryProductName').mockResolvedValueOnce(name);
      jest.spyOn(prompt, 'queryProductPrice').mockRejectedValueOnce(new Error());

      await expect(input.queryProduct()).rejects.toBeInstanceOf(Error);
    });

    test('should reject if the product position is not a valid position', async () => {
      jest.spyOn(prompt, 'queryProductName').mockResolvedValueOnce(name);
      jest.spyOn(prompt, 'queryProductPrice').mockResolvedValueOnce(price);
      jest.spyOn(prompt, 'queryProductPosition').mockRejectedValueOnce(new Error());

      await expect(input.queryProduct()).rejects.toBeInstanceOf(Error);
    });

    test('should reject if the product stock is not an integer', async () => {
      const queryProductNameSpy = jest.spyOn(prompt, 'queryProductName').mockResolvedValueOnce(name);
      jest.spyOn(prompt, 'queryProductPrice').mockResolvedValueOnce(price);
      jest.spyOn(prompt, 'queryProductPosition').mockResolvedValueOnce(position);
      jest.spyOn(prompt, 'queryProductStock').mockRejectedValueOnce(new Error());

      await expect(input.queryProduct()).rejects.toBeInstanceOf(Error);

      expect(queryProductNameSpy).toBeCalledTimes(1);
    });
  });
});
