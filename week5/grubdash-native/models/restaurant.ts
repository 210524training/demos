export default interface Restaurant {
  name: string;
  menu: Food[];
  location: string;
  rating: number;
  hours: Hours[];
  img: string;
  cuisine: string;
  type: RestaurantType;
  id: string;
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
