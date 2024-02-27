import { EventEmitter } from '@angular/core';
import { IUser } from '../models/user.model';

export interface TableAction {
  label: string;
  icon: string;
  color: string;
  class?: string;
  shouldShow?: (item: any) => boolean;
  event: EventEmitter<any>;
}

export const getDishActions = (): TableAction[] => {
  return [
    {
      label: 'edit',
      icon: 'edit',
      color: 'primary',
      event: new EventEmitter<any>(),
    },
    {
      label: 'delete',
      icon: 'delete',
      color: 'warn',
      event: new EventEmitter<any>(),
    },
  ];
};

export const getRestaurantActions = (): TableAction[] => {
  return [
    {
      label: 'edit',
      icon: 'edit',
      color: 'primary',
      event: new EventEmitter<any>(),
    },
    {
      label: 'delete',
      icon: 'delete',
      color: 'warn',
      event: new EventEmitter<any>(),
    },
  ];
};

export const getChefActions = (): TableAction[] => {
  let actions = getDishActions();
  actions.unshift({
    label: 'setChefOfTheWeek',
    icon: 'star',
    color: 'accent',
    class: 'yellow-star',
    event: new EventEmitter<any>(),
  });
  return actions;
};

export const getUserActions = (): TableAction[] => {
  return [
    {
      label: 'delete',
      icon: 'delete',
      color: 'warn',
      shouldShow: (user: IUser) => user.role === 'USER',
      event: new EventEmitter<any>(),
    },
  ];
};
