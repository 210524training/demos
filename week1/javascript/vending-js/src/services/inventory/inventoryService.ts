// Need an inventory
// Selection features
//          Item position
// Storage for money (optional)

import fs from 'fs/promises';
import Item, { Position } from '../../models/item';

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

// This function must be moved outside of the Item Class
// When we load the Inventory data at the start of the application
// It loses the __proto__ field
// Which means even though it has all of the fields
// It doesn't count as an instance of the Item class
// And therefore cannot call the toString() method
export function productString(item: Item) {
  return `[${item.position}] ${item.name} | $${item.price.toFixed(2)} | ${item.stock} left`;
}

class InventoryService {
  constructor(
    public inventory: Item[] = [],
  ) {}

  // This addProduct method will return false if an item name was already in the inventory
  // Otherwise it will insert a new item into the inventory in order of the position field
  // This is helpful because our displayContents() method will print results
  // in order from A0 - F9
  // We might not need the return value, but it may come in handy later
  addProduct(item: Item): boolean {
    if(this.inventory.find((element) => element.name === item.name)) {
      return false;
    }

    const index = this.inventory.findIndex((element) => item.position < element.position);

    // The new product should be at the front of the inventory
    if(index === -1) {
      this.inventory.splice(0, 0, item);
      // Insert into the front of the array
    } else {
      // The new product should be inserted at the discovered index
      this.inventory.splice(index, 0, item);
    }

    return true;
  }

  getByPosition(position: string): Item | undefined {
    return this.inventory.find((item) => item.position === position);
  }

  getByName(name: string): Item | undefined {
    return this.inventory.find((item) => item.name === name);
  }

  // restockItem() was refactored to use the position of an item instead
  // As that will be the primary means the user will select it
  restockItem(position: Position): void {
    const maxStock = 10;
    const snack = this.inventory.find((item) => item.position === position);
    if(snack) {
      snack.stock = maxStock;
    }
  }

  displayContents(): void {
    this.inventory.forEach((item) => console.log(productString(item)));
  }

  async save(): Promise<void> {
    const inventoryString = JSON.stringify(this.inventory);
    await fs.writeFile('inventory.json', inventoryString);
  }

  async load(): Promise<void> {
    const buffer = await fs.readFile('inventory.json');
    const data = buffer.toString();

    this.inventory = JSON.parse(data);
  }
}

export default new InventoryService();
