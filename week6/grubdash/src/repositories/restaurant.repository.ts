/* eslint-disable camelcase */
import { Pool } from 'pg';
import connectionString from '../database-config';
import log from '../log';
import Restaurant, { Food, Hours, RestaurantType } from '../models/restaurant';

export type DBRestaurant = {
  name: string,
  location: string,
  rating: number,
  img: string,
  cuisine: string,
  type: RestaurantType,
  id: string,
  food_name: string,
  price: number,
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  open: number;
  close: number;
}

export type DBRestaurantCondensed = {
  name: string,
  location: string,
  rating: number,
  img: string,
  cuisine: string,
  type: RestaurantType,
  id: string,
  food_name: string,
  price: number,
  hours: Hours[]
}

const restaurantQuery = `SELECT
  rest.id,
  rest.name,
  rest.type,
  rest.location,
  rest.cuisine,
  rest.img,
  rest.rating,
  menu.name AS food_name,
  menu.price,
  hours.day,
  hours.open,
  hours.close
FROM public.restaurants AS rest
  LEFT JOIN public.menu ON rest.id = menu.restaurant_id
  LEFT JOIN public.hours ON rest.id = hours.restaurant_id`;

export class RestaurantDAO {
  private pool: Pool;

  constructor() {
    this.pool = new Pool({
      connectionString,
      min: 5,
      max: 20,
    });
  }

  // eslint-disable-next-line class-methods-use-this
  private mapToRestaurants(dbrestaurants: DBRestaurant[]): Restaurant[] {
    const restaurants: Restaurant[] = dbrestaurants.reduce(

      (acc: Restaurant[], dbrestaurant: DBRestaurant): Restaurant[] => {
        const rest: Restaurant | undefined = acc.find((r) => r.id === dbrestaurant.id);

        // If we have yet to accumulate over a Restaurant with the given ID
        // Then it means we are instantiating a new restaurant object
        // And then in another iteration, we will fill this with the menu and hours
        if(!rest) {
          const newFood: Food = {
            name: dbrestaurant.food_name,
            price: dbrestaurant.price,
          };

          const menu: Food[] = [newFood];

          const newHour: Hours = {
            day: dbrestaurant.day,
            open: dbrestaurant.open,
            close: dbrestaurant.close,
          };

          const hours: Hours[] = [newHour];

          acc.push(
            new Restaurant(
              dbrestaurant.name,
              menu,
              dbrestaurant.location,
              dbrestaurant.rating,
              hours,
              dbrestaurant.img,
              dbrestaurant.cuisine,
              dbrestaurant.type,
              dbrestaurant.id,
            ),
          );

          return acc;
        }

        // Outside the if statement
        // We have access to the restaurant object that we have partially filled up
        // It has some of the hours and some of the menu, but not all of it
        // We also have potentially new information in the dbrestaurant
        // It will either be a new hours or a new menu item
        // But we don't know which part is new info

        // So, we need to check which part of the new info is actually new
        // and then fill our partial restaurant with the new info

        // Let's check if the hours are new

        // Check to see if the discovered hours so far includes the new hours Information
        // from the dbrestaurant
        if(rest.hours.find((hour) => hour.day === dbrestaurant.day)) {
          // If it does, then this means the menu information is new

          const newFood = {
            name: dbrestaurant.food_name,
            price: dbrestaurant.price,
          };

          rest.menu.push(newFood);
        } else {
          // Otherwise, the hours information is new
          const newHour = {
            day: dbrestaurant.day,
            open: dbrestaurant.open,
            close: dbrestaurant.close,
          };

          rest.hours.push(newHour);
        }

        return acc;
      }, [],
    );

    return restaurants;
  }

  async getAll(): Promise<Restaurant[]> {
    const client = await this.pool.connect();

    try {
      const res = await client.query<DBRestaurant>(restaurantQuery);
      return this.mapToRestaurants(res.rows);
    } catch(error) {
      log.error(error);
      throw error;
    } finally {
      client.release();
    }
  }

  async getById(id: string): Promise<Restaurant | null> {
    const client = await this.pool.connect();

    try {
      const res = await client.query<DBRestaurant>(`${restaurantQuery} WHERE id = $1`, [id]);
      return (res.rowCount === 0) ? null : this.mapToRestaurants(res.rows)[0];
    } catch(error) {
      log.error(error);
      throw error;
    } finally {
      client.release();
    }
  }

  // eslint-disable-next-line class-methods-use-this
  produceMenuInsert(menu: Food[]): string {
    let query = 'INSERT INTO public.menu (name, price, restaurant_id) VALUES ';

    menu.forEach((food, index) => {
      if(index !== 0) {
        query += ', ';
      }

      query += `($${index * 3 + 1}, $${index * 3 + 2}, $${index * 3 + 3})`;
    });

    return query;
  }

  // eslint-disable-next-line class-methods-use-this
  produceHoursInsert(hours: Hours[]): string {
    let query = 'INSERT INTO public.hours (day, open, close, restaurant_id) VALUES ';

    hours.forEach((hour, index) => {
      if(index !== 0) {
        query += ', ';
      }

      query += `($${index * 4 + 1}, $${index * 4 + 2}, $${index * 4 + 3}, $${index * 4 + 4})`;
    });

    return query;
  }

  async add(restaurant: Restaurant): Promise<boolean> {
    const client = await this.pool.connect();

    try {
      await client.query('BEGIN');

      // eslint-disable-next-line max-len
      const data = [restaurant.type, restaurant.rating, restaurant.cuisine, restaurant.img, restaurant.location, restaurant.name];
      const res = await client.query<{ id: string }>('INSERT INTO public.restaurants (type, rating, cuisine, img, location, name) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
        data);

      const restaurantId = res.rows[0].id;

      console.log(res);

      // This is going to produce an array
      // of strings and numbers
      // in the order of: food_name, price, restaurant_id, food_name, price, restaurant_id, ...
      // There will be a group of 3 values for every menu item
      const data2 = restaurant.menu.reduce((acc: (string | number)[], food) => {
        acc.push(food.name);
        acc.push(food.price);
        acc.push(restaurantId);

        return acc;
      }, []);
      const res2 = await client.query(this.produceMenuInsert(restaurant.menu), data2);

      console.log(res2);

      const data3 = restaurant.hours.reduce((acc: (string | number)[], hour) => {
        acc.push(hour.day);
        acc.push(hour.open);
        acc.push(hour.close);
        acc.push(restaurantId);

        return acc;
      }, []);
      const res3 = await client.query(this.produceHoursInsert(restaurant.hours), data3);

      console.log(res3);

      await client.query('COMMIT');
      return true;
    } catch(error) {
      log.error(error);
      await client.query('ROLLBACK');
      return false;
    } finally {
      client.release();
    }
  }

  async update(restaurant: Restaurant): Promise<boolean> {

  }

  async delete(id: string): Promise<boolean> {
    const client = await this.pool.connect();

    try {
      const res = await client.query('DELETE FROM public.restaurants WHERE id = $1', [id]);
      
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

const restaurantDAO = new RestaurantDAO();

export default restaurantDAO;
