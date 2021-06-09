export default class User {
  constructor(
    public username: string,
    public password: string,
    public address: string,
    public phoneNumber: string,
    public role: Role,
  ) {}
}

export type Role = 'Customer' | 'Admin';
