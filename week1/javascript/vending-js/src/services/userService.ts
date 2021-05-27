import fs from 'fs';
import User from '../models/user';

class UserService {
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

  save(): void {
    // We need a string that represents the contents of our 'users' array
    const usersString = JSON.stringify(this.users);
    // const data = new Uint8Array(Buffer.from(usersString));
    fs.writeFileSync('users.json', usersString);
  }

  async load(): Promise<void> {
    // const data = await fs.readFile('users.json').then(
    //   (buffer) => buffer.toString(),
    // );

    // const buffer = await fs.readFile('users.json');
    // const data = buffer.toString();
    return new Promise<void>(
      (resolve, reject) => {
        fs.readFile('users.json', (err, buffer) => {
          if(err) {
            reject();
          }

          this.users = JSON.parse(buffer.toString());
          resolve();
        });
      },
    );

    // The above 2 commented code blocks are different versions of the same instructions
  }
}

export default new UserService();
