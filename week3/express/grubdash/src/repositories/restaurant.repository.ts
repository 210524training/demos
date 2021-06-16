import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import dynamo from '../dynamo/dynamo';
import Restaurant from '../models/restaurant';

class RestaurantDAO {
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
      ProjectionExpression: 'id, name, menu, location, rating, hours, img, cuisine, type',
    };

    const data = await this.client.query(params).promise();

    return data.Items as Restaurant[];
  }

  async getById(id: string): Promise<Restaurant | null> {
    const params: DocumentClient.QueryInput = {
      TableName: 'Grubdash',
      KeyConditionExpression: 'category = :c AND id = :id',
      ExpressionAttributeValues: {
        ':c': 'Restaurant',
        ':id': id,
      },
      ProjectionExpression: 'id, name, menu, location, rating, hours, img, cuisine, type',
    };

    const data = await this.client.query(params).promise();

    if(!data.Items || data.Count === 0) {
      // No Restaraunt found with this id
      return null;
    }

    return data.Items[0] as Restaurant;
  }

  async add(restaurant: Restaurant): Promise<boolean> {
    const params: DocumentClient.PutItemInput = {
      TableName: 'Grubdash',
      Item: {
        ...restaurant,
        category: 'Restaurant',
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
      ConditionExpression: 'id <> :id',
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
