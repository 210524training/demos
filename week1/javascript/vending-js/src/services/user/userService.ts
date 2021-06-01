import fs from 'fs/promises';
import User from '../../models/user';

export class UserService {
  public currentUser: User | undefined;

  constructor(
      public users: User[] = [],
  ) {}

  findByUsername(username: string): User | undefined {
    return this.users.find((user) => user.username === username);
  }

  register(user: User): void {
    if(!this.findByUsername(user.username)) {
      this.users.push(user);
    }
  }

  login(username: string, password: string): boolean {
    const found = this.findByUsername(username);

    if(!found || found.password !== password) {
      return false;
    }

    this.currentUser = found;
    return true;
  }

  logout(): void {
    this.currentUser = undefined;
  }

  async save(): Promise<void> {
    // We need a string that represents the contents of our 'users' array
    const usersString = JSON.stringify(this.users);
    await fs.writeFile('users.json', usersString);
  }

  async load(): Promise<void> {
    const buffer = await fs.readFile('users.json');
    const data = buffer.toString();

    this.users = JSON.parse(data);
  }
}

export default new UserService();
