/* eslint-disable camelcase */
import { Pool } from 'pg';
import connectionString from '../database-config';
import log from '../log';
import User, { Role } from '../models/user';

export type DBUser = {
  username: string,
  password: string,
  role: Role,
  address: string,
  phone_number: string,
  id: string,
}

export class UserDAO {
  private pool: Pool;

  constructor() {
    this.pool = new Pool({
      connectionString,
      min: 5,
      max: 20,
    });
  }

  // eslint-disable-next-line class-methods-use-this
  private mapToUser(dbuser: DBUser): User {
    const user: User & { phone_number?: string } = {
      ...dbuser,
      phoneNumber: dbuser.phone_number,
    };

    delete user.phone_number;

    return user as User;
  }

  async getAll(): Promise<User[]> {
    const client = await this.pool.connect();

    try {
      const res = await client.query<DBUser>('SELECT * FROM public.users');
      return res.rows.map(this.mapToUser);
    } catch(error) {
      log.error(error);
      throw error;
    } finally {
      client.release();
    }
  }

  async getById(id: string): Promise<User | null> {
    const client = await this.pool.connect();

    try {
      const res = await client.query<DBUser>('SELECT * FROM public.users WHERE id = $1', [id]);

      return (res.rowCount === 0) ? null : res.rows.map(this.mapToUser)[0];
    } catch(error) {
      log.error(error);
      throw error;
    } finally {
      client.release();
    }
  }

  async getByUsername(username: string): Promise<User | null> {
    const client = await this.pool.connect();

    try {
      const res = await client.query<DBUser>('SELECT * FROM public.users WHERE username = $1', [username]);

      return (res.rowCount === 0) ? null : res.rows.map(this.mapToUser)[0];
    } catch(error) {
      log.error(error);
      throw error;
    } finally {
      client.release();
    }
  }

  async add(user: User): Promise<boolean> {
    const client = await this.pool.connect();

    try {
      const data = [user.username, user.password, user.role, user.phoneNumber, user.address];
      const res = await client.query('INSERT INTO public.users (username, password, role, phone_number, address) VALUES ($1, $2, $3, $4, $5)',
        data);

      console.log(res);
      return true;
    } catch(error) {
      log.error(error);
      return false;
    } finally {
      client.release();
    }
  }

  async update(user: User): Promise<boolean> {
    const client = await this.pool.connect();

    try {
      // eslint-disable-next-line max-len
      const data = [user.username, user.password, user.role, user.phoneNumber, user.address, user.id];
      const res = await client.query('UPDATE public.users SET username = $1, password = $2, role = $3, phone_number = $4, address = $5 WHERE id = $6',
        data);

      console.log(res);
      return true;
    } catch(error) {
      log.error(error);
      return false;
    } finally {
      client.release();
    }
  }

  async delete(id: string): Promise<boolean> {
    const client = await this.pool.connect();

    try {
      const res = await client.query('DELETE FROM public.users WHERE id = $1', [id]);

      console.log(res);
      return true;
    } catch(error) {
      log.error(error);
      return false;
    } finally {
      client.release();
    }
  }
}

const userDAO = new UserDAO();

export default userDAO;
