import { NoUserMatchesUsernameError, PasswordNotMatchesError } from '../errors';
import User from '../models/user';
import userDAO, { UserDAO } from '../repositories/user.repository';

export class UserService {
  private dao: UserDAO;

  constructor() {
    this.dao = userDAO;
  }

  getAll(): Promise<User[]> {
    return this.dao.getAll();
  }

  getById(id: string): Promise<User | null> {
    return this.dao.getById(id);
  }

  getByUsername(username: string): Promise<User | null> {
    return this.dao.getByUsername(username);
  }

  add(user: User): Promise<boolean> {
    return this.dao.add(new User(
      user.username,
      user.password,
      user.role,
      user.address,
      user.phoneNumber,
    ));
  }

  update(user: User): Promise<boolean> {
    return this.dao.update(new User(
      user.username,
      user.password,
      user.role,
      user.address,
      user.phoneNumber,
      user.id,
    ));
  }

  delete(id: string): Promise<boolean> {
    return this.dao.delete(id);
  }

  async login(username: string, password: string): Promise<User> {
    const user = await this.dao.getByUsername(username);

    if(!user) {
      throw new NoUserMatchesUsernameError();
    }

    if(user.password !== password) {
      throw new PasswordNotMatchesError();
    }

    return user;
  }

  register(user: User): Promise<boolean> {
    return this.add(user);
  }
}

const userService = new UserService();

export default userService;
