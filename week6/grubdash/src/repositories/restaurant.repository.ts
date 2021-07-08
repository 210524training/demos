import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import dynamo from '../dynamo/dynamo';
import Restaurant from '../models/restaurant';

export class RestaurantDAO {
  private client: DocumentClient;

  constructor() {
    this.client = dynamo;
  }

  async getAll(): Promise<Restaurant[]> {
    const params: DocumentClient.QueryInput = {
      TableName: 'Grubdash',
      KeyConditionExpression: 'category = :c',
      ExpressionAttributeValues: {
        ':c': 'Restaurant',
      },
      ExpressionAttributeNames: {
        '#n': 'name',
        '#loc': 'location',
        '#t': 'type',
      },
      ProjectionExpression: 'id, #n, menu, #loc, rating, hours, img, cuisine, #t',
    };

    const data = await this.client.query(params).promise();

    return data.Items as Restaurant[];
  }

  async getById(id: string): Promise<Restaurant | null> {
    const params: DocumentClient.GetItemInput = {
      TableName: 'Grubdash',
      Key: {
        category: 'Restaurant',
        id,
      },
      ExpressionAttributeNames: {
        '#n': 'name',
        '#loc': 'location',
        '#t': 'type',
      },
      ProjectionExpression: 'id, #n, menu, #loc, rating, hours, img, cuisine, #t',
    };

    const data = await this.client.get(params).promise();

    if(!data.Item) {
      // No Restaraunt found with this id
      return null;
    }

    return data.Item as Restaurant;
  }

  async add(restaurant: Restaurant): Promise<boolean> {
    const params: DocumentClient.PutItemInput = {
      TableName: 'Grubdash',
      Item: {
        ...restaurant,
        category: 'Restaurant',
      },
      ConditionExpression: 'id <> :id',
      ExpressionAttributeValues: {
        ':id': restaurant.id,
      },
    };
    try {
      await this.client.put(params).promise();

      return true;
    } catch(error) {
      console.log('Failed to add Restaurant: ', error);
      return false;
    }
  }

  async update(restaurant: Restaurant): Promise<boolean> {
    const params: DocumentClient.PutItemInput = {
      TableName: 'Grubdash',
      Item: {
        ...restaurant,
        category: 'Restaurant',
      },
      ConditionExpression: 'id = :id',
      ExpressionAttributeValues: {
        ':id': restaurant.id,
      },
    };

    try {
      await this.client.put(params).promise();

      return true;
    } catch(error) {
      console.log('Failed to update Restaurant: ', error);
      return false;
    }
  }

  async delete(id: string): Promise<boolean> {
    const params: DocumentClient.DeleteItemInput = {
      TableName: 'Grubdash',
      Key: {
        category: 'Restaurant',
        id,
      },
    };

    try {
      await this.client.delete(params).promise();

      return true;
    } catch(error) {
      console.log('Failed to delete Restaurant: ', error);
      return false;
    }
  }
}

const restaurantDAO = new RestaurantDAO();

export default restaurantDAO;
