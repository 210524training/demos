// Need an inventory
// Selection features
//          Item position
// Storage for money (optional)
import Item, { Position } from '../../models/item';
import inventoryRepository from '../../repositories/inventoryRepository';
import dynamo from '../connection/connectionService';

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
export var AWS = require('aws-sdk');
export var docClient = new AWS.DynamoDB.DocumentClient();
export function productString(item: Item) {
  return `[${item.position}] ${item.name} | $${item.price.toFixed(2)} | ${item.stock} left`;
}

class InventoryService {
  constructor(
    private repository = inventoryRepository,
  ) {}

  async putProduct(item: Item): Promise<boolean> {
    const params: DocumentClient.PutItemInput = {
      TableName: 'item',
      Item: item,
      ReturnConsumedCapacity: 'TOTAL',

    };
    try {
      const result = await docClient.put(params).promise();
      return true;

    }
    catch (err) {
      return false;
    }
  }

  async addProduct(item:Item): Promise<boolean> {
    const params: DocumentClient.PutItemInput = {
      TableName: items,
      ReturnConsumedCapacity:'TOTAL';
      ConditionExpression: 'position <> :position',
      ':position'

    }
  }


  // restockItem() was refactored to use the position of an item instead
  // As that will be the primary means the user will select it
  async restockItem(position: Position): Promise<void> {
    const maxStock = 10;
    const item = await this.repository.getByPosition(position);
    if(item) {
      item.stock = maxStock;

      const success = await this.repository.updateProduct(item);

      if(!success) {
        throw new Error('Failed to restock item');
      }
    }
  }

  async displayContents(): Promise<void> {
    const inventory = await this.repository.getAll();
    inventory.forEach((item) => console.log(productString(item)));
  }
}

export default new InventoryService();
