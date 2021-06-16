import { v4 as uuidv4 } from 'uuid';

export default class User {
  constructor(
    public username: string,
    public password: string,
    public address: string,
    public phoneNumber: string,
    public role: Role,
    public id: string = uuidv4(),
  ) {}
}

export type Role = 'Customer' | 'Admin';
