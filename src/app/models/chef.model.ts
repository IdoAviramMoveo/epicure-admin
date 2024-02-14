import { IRestaurant } from './restaurant.model';

export interface IChef {
  title: string;
  image: string;
  description: string;
  restaurants: IRestaurant[];
  isChefOfTheWeek: boolean;
}
