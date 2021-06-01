/* eslint-disable import/no-extraneous-dependencies */
import RandExp from 'randexp';
import fs from 'fs/promises';
import Item, { Position } from '../../models/item';
import inventoryService from './inventoryService';

describe('Within InventoryService Module', () => {
  beforeEach(() => {
    inventoryService.inventory = [];
  });

  describe('getByPosition', () => {
    test('should return the item with the given position', () => {
      const position = new RandExp(/^[A-F][0-9]$/).gen() as Position;
      const item = new Item('', 0, position, 0);
      inventoryService.inventory = [item];

      expect(inventoryService.getByPosition(position)).toBe(item);
    });

    test('should return undefined if the position is not found', () => {
      const position = new RandExp(/^[A-F][0-9]$/).gen() as Position;
      const item = new Item();
      inventoryService.inventory = [item];

      expect(inventoryService.getByPosition(position)).toBeUndefined();
    });
  });

  describe('save', () => {
    test('should call fs.writeFile with inventory.json', async () => {
      jest.spyOn(fs, 'writeFile').mockResolvedValueOnce();

      await expect(inventoryService.save()).resolves.toBeUndefined();

      expect(fs.writeFile).toHaveBeenCalledWith('inventory.json', expect.anything());
    });

    test('should reject if fs.writeFile throws', async () => {
      jest.spyOn(fs, 'writeFile').mockRejectedValueOnce(new Error());

      await expect(inventoryService.save()).rejects.toBeInstanceOf(Error);
    });
  });

  describe('load', () => {
    test('should call fs.readFile with inventory.json', async () => {
      jest.spyOn(fs, 'readFile').mockResolvedValueOnce('[]');

      await expect(inventoryService.load()).resolves.toBeUndefined();

      expect(fs.readFile).toHaveBeenCalledWith('inventory.json');
    });

    test('should reject if fs.readFile throws', async () => {
      jest.spyOn(fs, 'readFile').mockRejectedValueOnce(new Error());

      await expect(inventoryService.load()).rejects.toBeInstanceOf(Error);
    });
  });
});
