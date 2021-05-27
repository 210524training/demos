// Need an inventory
// Selection features
//          Item position
// Storage for money (optional)
import fs from 'fs';
import Item from '../models/item';

// const inventory = [];
// I can use const here
// Because I do not need to reassign its contents
// I will simply be adding or removing from it

// What happens to our inventory data when our program ends?
// It goes away -- It gets deleted
// It is not permanently stored anywhere

// How do I fix this?
// Writing to a file
// Reading from a file
//              Require reassigning our inventory array

// There are certain actions we might want to perform against this inventory
// getItemByPosition
// restockItem
// displayContents

// Eventually
// save/load contents to/from file

// We can create these as different functions and export them
// Or we can create a class and export that instead
// Note however, unlike User or Item, we will only need 1 instance of this kind of class
// so instead of exporting the class itself, we would export an instance of the class

class InventoryService {
  constructor(
    public inventory: Item[] = [],
  ) {}

  getByPosition(position: string): Item {
    // Rooms 1 & 2
    const found = this.inventory.find((item) => item.position === position);

    if(found) {
      return found;
    }

    throw new Error('No item matches given position in inventory');
  }

  restockItem(itemName: string): void {
    // Rooms 3 & 4
    const maxStock = 10;
    const snack = this.inventory.find((item) => item.name === itemName);
    if(snack) {
      snack.stock = maxStock;
    }
  }

  displayContents(): void {
    this.inventory.forEach((item) => console.log(item.toString()));
  }

  async load(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      fs.readFile('inventory.json', (err, buffer) => {
        if(err) {
          reject();
        }
        this.inventory = JSON.parse(buffer.toString());
        resolve();
      });
    });
  }
}

export default new InventoryService();
