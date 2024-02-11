import { IRestaurant } from './restaurant.model';

export interface IDish {
  title: string;
  image: string;
  ingredients: string[];
  tags: string[];
  price: number;
  restaurant: IRestaurant;
  isSignature: boolean;
}
