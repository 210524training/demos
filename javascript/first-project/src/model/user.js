export class User{
    username: string;
    password: string;
    role = "Customer";
    balance = 0;

    constructor(username, password,role,balance){
        super();
        this.username;
        this.username = username;
        this.role = role;
        this.balance= balance;
    }
}