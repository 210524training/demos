export default class User {
  constructor(
    public username: string,
    public password: string,
    public role: Role = 'Customer',
    public address?: string,
    public phoneNumber?: string,
    public id?: string,
  ) {}
}

export type Role = 'Customer' | 'Admin';
