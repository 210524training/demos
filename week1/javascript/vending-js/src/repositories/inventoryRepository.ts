import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import log from '../log';
import Item, { Position } from '../models/item';
import dynamo from '../dynamo/dynamo';

// Follows the DAO Design Pattern
// Data Access Object
// We isolate all of our data interaction into a single object/class/module
class InventoryRepository {
  constructor(
        private docClient: DocumentClient = dynamo,
  ) {}

  // This addProduct method will return false if an item name was already in the inventory
  // Otherwise it will insert a new item into the inventory in order of the position field
  // This is helpful because our displayContents() method will print results
  // in order from A0 - F9
  // We might not need the return value, but it may come in handy later
  async updateProduct(item: Item): Promise<boolean> {
    const params: DocumentClient.UpdateItemInput = {
      TableName: 'items',
      Key: {
        position: item.position,
      },
      ReturnConsumedCapacity: 'TOTAL',
      UpdateExpression: 'SET stock = :s, price = :p',
      ExpressionAttributeValues: {
        ':p': item.price,
        ':s': item.stock,
      },
      ReturnValues: 'UPDATED_NEW',
    };

    try {
      const result = await this.docClient.update(params).promise();

      log.debug(result);
      return true;
    } catch(error) {
      return false;
    }
  }

  async addProduct(item: Item): Promise<boolean> {
    const params: DocumentClient.PutItemInput = {
      TableName: 'items',
      Item: item,
      ReturnConsumedCapacity: 'TOTAL',
      ConditionExpression: 'position <> :position',
      ExpressionAttributeValues: {
        ':position': item.position,
      },
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
}

export default new InventoryRepository();
