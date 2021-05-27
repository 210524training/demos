// Need an inventory
// Selection features
//          Item position
// Storage for money (optional)

import Item from './item';

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
<<<<<<< HEAD:week1/javascript/vending-js/src/models/vendingMachine.js
export let inventory = [];
=======
>>>>>>> main:week1/javascript/vending-js/src/models/vendingMachine.ts

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

class VendingMachine {
  constructor(
    public inventory: Item[] = [],
  ) {}

  getByPosition(position: string): Item {
    // Rooms 1 & 2
  }

  restockItem(itemName: string): void {
    const maxStock: number = 10
    for(const item of this.inventory) {
      if(item.name === itemName) {
          item.stock = maxStock;
      }
  }
  }

  displayContents(): void {
    this.inventory.forEach((item) => console.log(item.toString()));
  }
}

export default new VendingMachine();
