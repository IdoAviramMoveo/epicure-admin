import { IDish } from './dish.model';
import { IChef } from './chef.model';

export interface IRestaurant {
  _id?: string;
  title: string;
  image: string;
  chef: IChef;
  rating: number;
  dishes: IDish[];
  isPopular: boolean;
}
