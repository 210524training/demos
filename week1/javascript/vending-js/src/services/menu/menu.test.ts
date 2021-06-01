/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable import/no-extraneous-dependencies */
import RandExp from 'randexp';
import * as prompt from '../prompt/prompt';
import * as menu from './menu';
import * as input from '../input/input';
import * as utils from '../../utils/inpututils';
import userService from '../user/userService';
import User from '../../models/user';
import log from '../../log';
import Item, { Position } from '../../models/item';
import inventoryService from '../inventory/inventoryService';

describe('Within the Menu Module', () => {
  afterAll(() => {
    utils.rl.close();
  });

  beforeEach(() => {
    jest.spyOn(console, 'log').mockImplementation();
    jest.spyOn(log, 'debug').mockImplementation();
  });

  describe('attemptLogin', () => {
    const username = new RandExp(/^[a-zA-Z0-9]*$/).gen();
    const password = new RandExp(/^[a-zA-Z0-9]*$/).gen();

    test('should resolve if username and password allow userService to succeed', async () => {
      jest.spyOn(prompt, 'queryUsername').mockResolvedValueOnce(username);
      jest.spyOn(prompt, 'queryPassword').mockResolvedValueOnce(password);
      jest.spyOn(userService, 'login').mockReturnValueOnce(true);

      await expect(menu.attemptLogin()).resolves.toBeUndefined();

      expect(userService.login).toHaveBeenCalledWith(username, password);
    });

    test('should reject if userService fails to login', async () => {
      jest.spyOn(prompt, 'queryUsername').mockResolvedValueOnce(username);
      jest.spyOn(prompt, 'queryPassword').mockResolvedValueOnce(password);
      jest.spyOn(userService, 'login').mockReturnValueOnce(false);

      await expect(menu.attemptLogin()).rejects.toBeInstanceOf(Error);

      expect(userService.login).toHaveBeenCalledWith(username, password);
    });
  });

  describe('attemptRegister', () => {
    const username = new RandExp(/^[a-zA-Z0-9]{2,}$/).gen();
    const password = new RandExp(/^[a-zA-Z0-9]{2,}$/).gen();
    const balance = Number(new RandExp(/^[0-9]*(\.[0-9]*)?$/).gen());

    test('should resolve if username is not taken and inputs are valid', async () => {
      jest.spyOn(prompt, 'queryUsername').mockResolvedValueOnce(username);
      jest.spyOn(userService, 'findByUsername').mockReturnValueOnce(undefined);
      jest.spyOn(input, 'registerPassword').mockResolvedValueOnce(password);
      jest.spyOn(prompt, 'queryBalance').mockResolvedValueOnce(balance);
      jest.spyOn(userService, 'register').mockImplementationOnce(() => {});

      await expect(menu.attemptRegister()).resolves.toBeUndefined();
    });

    test('should reject if username is taken', async () => {
      jest.spyOn(prompt, 'queryUsername').mockResolvedValueOnce(username);
      jest.spyOn(userService, 'findByUsername').mockReturnValueOnce(new User());

      await expect(menu.attemptRegister()).rejects.toBeInstanceOf(Error);
    });

    test('should reject if password input fails', async () => {
      jest.spyOn(prompt, 'queryUsername').mockResolvedValueOnce(username);
      jest.spyOn(userService, 'findByUsername').mockReturnValueOnce(undefined);
      jest.spyOn(input, 'registerPassword').mockRejectedValueOnce(new Error());

      await expect(menu.attemptRegister()).rejects.toBeInstanceOf(Error);
    });

    test('should reject if balance input fails', async () => {
      jest.spyOn(prompt, 'queryUsername').mockResolvedValueOnce(username);
      jest.spyOn(userService, 'findByUsername').mockReturnValueOnce(undefined);
      jest.spyOn(input, 'registerPassword').mockResolvedValueOnce(password);
      jest.spyOn(prompt, 'queryBalance').mockRejectedValueOnce(new Error());

      await expect(menu.attemptRegister()).rejects.toBeInstanceOf(Error);
    });
  });

  describe('attemptAddProduct', () => {
    const name = new RandExp(/^[a-zA-Z0-9]*$/).gen();
    const price = Number(new RandExp(/^[0-9]*(\.[0-9]*)?$/).gen());
    const position = new RandExp(/^[A-F][0-9]$/).gen() as Position;
    const stock = Number(new RandExp(/^[0-9]*$/).gen());

    test('should resolve if queryProduct is successful', async () => {
      const item = new Item(name, price, position, stock);
      jest.spyOn(input, 'queryProduct').mockResolvedValueOnce(item);
      jest.spyOn(inventoryService, 'addProduct').mockReturnValueOnce(true);

      await expect(menu.attemptAddProduct()).resolves.toBeUndefined();

      expect(inventoryService.addProduct).toHaveBeenCalledWith(item);
    });

    test('should reject with an error if queryProduct is unsuccessful', async () => {
      jest.spyOn(input, 'queryProduct').mockRejectedValueOnce(new Error());

      await expect(menu.attemptAddProduct()).rejects.toBeInstanceOf(Error);
    });
  });
});
