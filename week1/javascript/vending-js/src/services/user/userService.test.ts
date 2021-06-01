/* eslint-disable import/no-extraneous-dependencies */
import RandExp from 'randexp';
import fs from 'fs/promises';
import User from '../../models/user';
import userService from './userService';

describe('Within UserService Module', () => {
  beforeEach(() => {
    userService.currentUser = undefined;
    userService.users = [];
  });

  describe('findByUsername', () => {
    test('should return the user with the given username', () => {
      const username = new RandExp(/^[a-zA-Z0-9]*$/).gen();
      const user = new User(username);
      userService.users = [user];

      expect(userService.findByUsername(username)).toBe(user);
    });

    test('should return undefined if the username is not found', () => {
      const username = new RandExp(/^[a-zA-Z0-9]+$/).gen();

      userService.users = [new User()];

      expect(userService.findByUsername(username)).toBeUndefined();
    });
  });

  describe('register', () => {
    test('shouldn\'t add the user if the given username is already registered', () => {
      const username = new RandExp(/^[a-zA-Z0-9]*$/).gen();
      const user = new User(username);
      userService.users = [user];

      userService.register(new User(username));

      expect(userService.users.length).toBe(1);
    });

    test('should add a new user if the given username isn\'t already registered', () => {
      const username = new RandExp(/^[a-zA-Z0-9]*$/).gen();
      const user = new User();
      userService.users = [user];

      userService.register(new User(username));

      expect(userService.users.length).toBe(2);
    });
  });

  describe('login', () => {
    test('should return true and assign currentUser if the credentials match a registered user', () => {
      const username = new RandExp(/^[a-zA-Z0-9]*$/).gen();
      const password = new RandExp(/^[a-zA-Z0-9]*$/).gen();
      const user = new User(username, password);
      userService.users = [user];

      expect(userService.login(username, password)).toBe(true);
      expect(userService.currentUser).toBe(user);
    });

    test('should return false and leave currentUser unchanged if the credentials do not match a registered user', () => {
      const username = new RandExp(/^[a-zA-Z0-9]+$/).gen();
      const password = new RandExp(/^[a-zA-Z0-9]+$/).gen();
      userService.users = [new User()];

      expect(userService.login(username, password)).toBe(false);
      expect(userService.currentUser).toBeUndefined();
    });
  });

  describe('logout', () => {
    test('should set currentUser to undefined', () => {
      userService.currentUser = new User();

      userService.logout();

      expect(userService.currentUser).toBeUndefined();
    });
  });

  describe('save', () => {
    test('should call fs.writeFile with users.json', async () => {
      jest.spyOn(fs, 'writeFile').mockResolvedValueOnce();

      await expect(userService.save()).resolves.toBeUndefined();

      expect(fs.writeFile).toHaveBeenCalledWith('users.json', expect.anything());
    });

    test('should reject if fs.writeFile throws', async () => {
      jest.spyOn(fs, 'writeFile').mockRejectedValueOnce(new Error());

      await expect(userService.save()).rejects.toBeInstanceOf(Error);
    });
  });

  describe('load', () => {
    test('should call fs.readFile with users.json', async () => {
      jest.spyOn(fs, 'readFile').mockResolvedValueOnce('[]');

      await expect(userService.load()).resolves.toBeUndefined();

      expect(fs.readFile).toHaveBeenCalledWith('users.json');
    });

    test('should reject if fs.readFile throws', async () => {
      jest.spyOn(fs, 'readFile').mockRejectedValueOnce(new Error());

      await expect(userService.load()).rejects.toBeInstanceOf(Error);
    });
  });
});
