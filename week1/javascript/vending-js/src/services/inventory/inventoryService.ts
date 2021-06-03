// Need an inventory
// Selection features
//          Item position
// Storage for money (optional)

import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import log from '../../log';
import Item, { Position } from '../../models/item';
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
export function productString(item: Item) {
  return `[${item.position}] ${item.name} | $${item.price.toFixed(2)} | ${item.stock} left`;
}

class InventoryService {
  constructor(
    private docClient: DocumentClient = dynamo,
  ) {}

  // This addProduct method will return false if an item name was already in the inventory
  // Otherwise it will insert a new item into the inventory in order of the position field
  // This is helpful because our displayContents() method will print results
  // in order from A0 - F9
  // We might not need the return value, but it may come in handy later
  async putProduct(item: Item): Promise<boolean> {
    const params: DocumentClient.PutItemInput = {
      TableName: 'items',
      Item: item,
      ReturnConsumedCapacity: 'TOTAL',
    };

    try {
      const result = await this.docClient.put(params).promise();

      log.debug(result);
      return true;
    } catch(error) {
      return false;
    }
  }

  async getByPosition(position: Position): Promise<Item | undefined> {
    const params: DocumentClient.GetItemInput = {
      TableName: 'items',
      Key: {
        position,
      },
      ProjectionExpression: '#pos, #n, #s, #p',
      ExpressionAttributeNames: {
        '#pos': 'position',
        '#n': 'name',
        '#s': 'stock',
        '#p': 'price',
      },
    };

    const data = await this.docClient.get(params).promise();

    return data.Item as Item | undefined;
  }

  async getByName(name: string): Promise<Item | undefined> {
    const params: DocumentClient.GetItemInput = {
      TableName: 'items',
      Key: {
        name,
      },
      ProjectionExpression: '#pos, #n, #s, #p',
      ExpressionAttributeNames: {
        '#pos': 'position',
        '#n': 'name',
        '#s': 'stock',
        '#p': 'price',
      },
    };

    const data = await this.docClient.get(params).promise();

    return data.Item as Item | undefined;
  }

  async getAll(): Promise<Item[]> {
    const params: DocumentClient.ScanInput = {
      TableName: 'items',
      ProjectionExpression: '#pos, #n, #s, #p',
      ExpressionAttributeNames: {
        '#pos': 'position',
        '#n': 'name',
        '#s': 'stock',
        '#p': 'price',
      },
    };

    const data = await this.docClient.scan(params).promise();

    if(data.Items) {
      return data.Items as Item[];
    }

    return [];
  }

  // restockItem() was refactored to use the position of an item instead
  // As that will be the primary means the user will select it
  async restockItem(position: Position): Promise<void> {
    const maxStock = 10;
    const item = await this.getByPosition(position);
    if(item) {
      item.stock = maxStock;

      const success = await this.putProduct(item);

      if(!success) {
        throw new Error('Failed to restock item');
      }
    }
  }

  async displayContents(): Promise<void> {
    const inventory = await this.getAll();
    inventory.forEach((item) => console.log(productString(item)));
  }
}

export default new InventoryService();
