import Restaurant from '../models/restaurant';
import restaurantDAO, { RestaurantDAO } from '../repositories/restaurant.repository';

export class RestaurantService {
  private dao: RestaurantDAO;

  constructor() {
    this.dao = restaurantDAO;
  }

  getAll(): Promise<Restaurant[]> {
    return this.dao.getAll();
  }

  getById(id: string): Promise<Restaurant | null> {
    return this.dao.getById(id);
  }

  add(restaurant: Restaurant): Promise<boolean> {
    return this.dao.add(restaurant);
  }

  update(restaurant: Restaurant): Promise<boolean> {
    return this.dao.update(restaurant);
  }

  delete(id: string): Promise<boolean> {
    return this.dao.delete(id);
  }
}

const restaurantService = new RestaurantService();

export default restaurantService;
