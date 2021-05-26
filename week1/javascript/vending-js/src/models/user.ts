// balance
// username
// password
// role

export class User {
    username = '';
    password = '';
    role = 'Customer';
    balance = 0;

    constructor(username, password, role, balance) {
        this.username = username;
        this.password = password;
        this.role = role;
        this.balance = balance;
    }
}