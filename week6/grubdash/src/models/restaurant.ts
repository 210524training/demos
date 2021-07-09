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
    public id?: string,
  ) {}
}

export interface Food {
    id?: string,
    name: string,
    price: number,
}

export interface Hours {
  id?: string,
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday',
  open: number,
  close: number,
}

export type RestaurantType = 'Fast Food' | 'Fast Casual' | 'Dine In' | 'Formal';
