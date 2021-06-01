/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable import/no-extraneous-dependencies */
import RandExp from 'randexp';
import inventoryService from '../services/inventory/inventoryService';
import userService from '../services/user/userService';
import * as utils from './inpututils';

describe('Within the Input Utils Module', () => {
  afterAll(() => {
    utils.rl.close();
  });

  describe('exit', () => {
    beforeEach(() => {
      // Each of these would have to be stored in a variable
      // And then invoke the .mockRestore() function when the mocks are no longer needed
      // However, in the 'jest.config.ts` file
      // We have set 'restoreMocks' to true
      // This automatically restores our mocks after each test
      // So we make sure to re-mock before EACH test
      jest.spyOn(process, 'exit').mockImplementation();
      jest.spyOn(userService, 'save').mockImplementation();
      jest.spyOn(inventoryService, 'save').mockImplementation();

      // Ideally, the above 3 spys would also be mocked only once
      // But the typing for those methods are a bit tedious to provide a mock implementation
      // So I haven't bothered
      // However, this method below is the important one
      // Since at the top of this test file, we need to invoke the real
      // implementation once at the very end to close the readline interface
      // For the above methods, we don't actually need to use the real implementation

      jest.spyOn(utils.rl, 'close').mockImplementationOnce(() => {});
    });

    test('should save users', async () => {
      await utils.exit();

      expect(userService.save).toHaveBeenCalledTimes(1);
    });

    test('should save inventory', async () => {
      await utils.exit();

      expect(inventoryService.save).toHaveBeenCalledTimes(1);
    });

    test('should close the readline interface', async () => {
      await utils.exit();

      expect(utils.rl.close).toHaveBeenCalledTimes(1);
    });

    test('should cause the program to exit', async () => {
      await utils.exit();

      expect(process.exit).toHaveBeenCalledTimes(1);
    });
  });

  describe('questionAsync', () => {
    test('should resolve with the input if isValid is not provided', async () => {
      const randomResponse = new RandExp(/^[a-zA-Z0-9]*$/).gen();
      const randomPrompt = new RandExp(/^[a-zA-Z0-9]*$/).gen();

      jest.spyOn(utils.rl, 'question').mockImplementationOnce(
        (questionText, answer) => answer(randomResponse),
      );

      await expect(utils.questionAsync(randomPrompt)).resolves.toBe(randomResponse);
    });

    test('should reject with an error if isValid returns false', async () => {
      const randomResponse = new RandExp(/^[a-zA-Z0-9]*$/).gen();
      const randomPrompt = new RandExp(/^[a-zA-Z0-9]*$/).gen();

      jest.spyOn(utils.rl, 'question').mockImplementationOnce(
        (questionText, answer) => answer(randomResponse),
      );

      await expect(utils.questionAsync(randomPrompt, () => false)).rejects.toBeInstanceOf(Error);
    });
  });
});
