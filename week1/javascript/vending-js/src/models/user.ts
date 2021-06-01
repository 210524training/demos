// balance
// username
// password
// role

export default class User {
  constructor(
    public username: string = '',
    public password: string = '',
    public role: 'Customer' | 'Employee' = 'Customer',
    public balance: number = 0,
  ) {}
}
