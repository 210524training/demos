// balance
// username
// password
// role

export default class User {
  constructor(public username: string, public password: string, public role: 'Customer' | 'Employee', public balance: number) {
    this.username = username;
    this.password = password;
    this.role = role;
    this.balance = balance;
  }
}
