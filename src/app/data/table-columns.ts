import { IRestaurant } from '../models/restaurant.model';
import { IDish } from '../models/dish.model';
import { IChef } from '../models/chef.model';
import { IUser } from '../models/user.model';

export const dishColumns: any[] = [
  {
    columnDef: 'title',
    header: 'Title',
    cell: (element: IDish) => element.title,
  },
  {
    columnDef: 'image',
    header: 'Image',
    cell: (element: IDish) => element.image,
  },
  {
    columnDef: 'ingredients',
    header: 'Ingredients',
    cell: (element: IDish) => element.ingredients.join(', '),
  },
  {
    columnDef: 'tags',
    header: 'Tags',
    cell: (element: IDish) => element.tags.join(', '),
  },
  {
    columnDef: 'price',
    header: 'Price',
    cell: (element: IDish) => element.price.toString(),
  },
  {
    columnDef: 'isSignature',
    header: 'Is Signature',
    cell: (element: IDish) => (element.isSignature ? 'Yes' : 'No'),
  },
  {
    columnDef: 'actions',
    header: 'Actions',
  },
];

export const restaurantColumns: any[] = [
  {
    columnDef: 'title',
    header: 'Title',
    cell: (element: IRestaurant) => element.title,
  },
  {
    columnDef: 'image',
    header: 'Image',
    cell: (element: IRestaurant) => element.image,
  },
  {
    columnDef: 'chef',
    header: 'Chef',
    cell: (element: IRestaurant) => element.chef.title,
  },
  {
    columnDef: 'dishes',
    header: 'Dishes',
    cell: (element: IRestaurant) =>
      element.dishes.map((dish) => dish.title).join(', '),
  },
  {
    columnDef: 'rating',
    header: 'Rating',
    cell: (element: IRestaurant) => element.rating.toString(),
  },
  {
    columnDef: 'isPopular',
    header: 'Is Popular',
    cell: (element: IRestaurant) => (element.isPopular ? 'Yes' : 'No'),
  },
  {
    columnDef: 'actions',
    header: 'Actions',
  },
];

export const chefColumns: any[] = [
  {
    columnDef: 'title',
    header: 'Title',
    cell: (element: IChef) => element.title,
  },
  {
    columnDef: 'image',
    header: 'Image',
    cell: (element: IChef) => element.image,
  },
  {
    columnDef: 'description',
    header: 'Description',
    cell: (element: IChef) => element.description,
  },
  {
    columnDef: 'restaurants',
    header: 'Restaurants',
    cell: (element: IChef) =>
      element.restaurants.map((restaurant) => restaurant.title).join(', '),
  },
  {
    columnDef: 'isChefOfTheWeek',
    header: 'Is Chef Of The Week',
    cell: (element: IChef) => (element.isChefOfTheWeek ? 'Yes' : 'No'),
  },
  {
    columnDef: 'actions',
    header: 'Actions',
  },
];

export const userColumns: any[] = [
  {
    columnDef: 'name',
    header: 'Name',
    cell: (element: IUser) => element.name,
  },
  {
    columnDef: 'surname',
    header: 'Surname',
    cell: (element: IUser) => element.surname,
  },
  {
    columnDef: 'email',
    header: 'Email',
    cell: (element: IUser) => element.email,
  },
  {
    columnDef: 'role',
    header: 'Role',
    cell: (element: IUser) => element.role,
  },
  {
    columnDef: 'actions',
    header: 'Actions',
  },
];
