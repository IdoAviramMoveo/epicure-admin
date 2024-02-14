import { EventEmitter } from '@angular/core';

export interface TableAction {
  label: string;
  icon: string;
  color: string;
  class?: string;
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
  actions.push({
    label: 'setChefOfTheWeek',
    icon: 'star',
    color: 'accent',
    class: 'yellow-star',
    event: new EventEmitter<any>(),
  });
  return actions;
};
