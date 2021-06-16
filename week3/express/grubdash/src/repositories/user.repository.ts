import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import dynamo from '../dynamo/dynamo';
import User from '../models/user';

export class UserDAO {
  private client: DocumentClient;

  constructor() {
    this.client = dynamo;
  }

  async getAll(): Promise<User[]> {
    const params: DocumentClient.QueryInput = {
      TableName: 'Grubdash',
      KeyConditionExpression: 'category = :c',
      ExpressionAttributeValues: {
        ':c': 'User',
      },
      ExpressionAttributeNames: {
        '#r': 'role',
      },
      ProjectionExpression: 'id, username, password, address, phoneNumber, #r',
    };

    const data = await this.client.query(params).promise();

    return data.Items as User[];
  }

  async getById(id: string): Promise<User | null> {
    const params: DocumentClient.GetItemInput = {
      TableName: 'Grubdash',
      Key: {
        category: 'User',
        id,
      },
      ExpressionAttributeNames: {
        '#r': 'role',
      },
      ProjectionExpression: 'id, username, password, address, phoneNumber, #r',
    };

    const data = await this.client.get(params).promise();

    if(!data.Item) {
      // No User found with this id
      return null;
    }

    return data.Item as User;
  }

  async getByUsername(username: string): Promise<User | null> {
    const params: DocumentClient.QueryInput = {
      TableName: 'Grubdash',
      IndexName: 'user-username',
      KeyConditionExpression: 'category = :c AND username = :u',
      ExpressionAttributeValues: {
        ':c': 'User',
        ':u': username,
      },
      ExpressionAttributeNames: {
        '#r': 'role',
      },
      ProjectionExpression: 'id, username, password, address, phoneNumber, #r',
    };

    const data = await this.client.query(params).promise();

    if(!data.Items || data.Count === 0) {
      // No User found with this username
      return null;
    }

    return data.Items[0] as User;
  }

  async add(user: User): Promise<boolean> {
    const params: DocumentClient.PutItemInput = {
      TableName: 'Grubdash',
      Item: {
        ...user,
        category: 'User',
      },
      ConditionExpression: 'id <> :id',
      ExpressionAttributeValues: {
        ':id': user.id,
      },
    };
    try {
      await this.client.put(params).promise();

      return true;
    } catch(error) {
      console.log('Failed to add User: ', error);
      return false;
    }
  }

  async update(user: User): Promise<boolean> {
    const params: DocumentClient.PutItemInput = {
      TableName: 'Grubdash',
      Item: {
        ...user,
        category: 'User',
      },
      ConditionExpression: 'id = :id',
      ExpressionAttributeValues: {
        ':id': user.id,
      },
    };

    try {
      await this.client.put(params).promise();

      return true;
    } catch(error) {
      console.log('Failed to update User: ', error);
      return false;
    }
  }

  async delete(id: string): Promise<boolean> {
    const params: DocumentClient.DeleteItemInput = {
      TableName: 'Grubdash',
      Key: {
        category: 'User',
        id,
      },
    };

    try {
      await this.client.delete(params).promise();

      return true;
    } catch(error) {
      console.log('Failed to delete User: ', error);
      return false;
    }
  }
}

const userDAO = new UserDAO();

export default userDAO;
