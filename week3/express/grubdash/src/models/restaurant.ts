import { v4 as uuidv4 } from 'uuid';

export default class Restaurant {
  constructor(
    public name: string,
    public menu: Food[],
    public location: string,
    public rating: number = 0,
    public hours: Hours[],
    public img: string,
    public cuisine: string,
    public type: RestaurantType,
    public id: string = uuidv4(),
  ) {}
}

export interface Food {
    name: string,
    price: number
}

export interface Hours {
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  open: number;
  close: number;
}

export type RestaurantType = 'Fast Food' | 'Fast Casual' | 'Dine In' | 'Formal';
