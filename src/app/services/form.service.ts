import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  constructor(private fb: FormBuilder) {}

  initRestaurantForm(restaurantData = null) {
    return this.fb.group({
      title: [restaurantData ? restaurantData.title : '', Validators.required],
      image: [restaurantData ? restaurantData.image : '', Validators.required],
      chefId: [
        restaurantData && restaurantData.chef ? restaurantData.chef.id : '',
        Validators.required,
      ],
      rating: [
        restaurantData ? restaurantData.rating : '',
        [Validators.required, Validators.min(1), Validators.max(5)],
      ],
      isPopular: [restaurantData ? restaurantData.isPopular : false],
    });
  }

  initChefForm(chefData = null) {
    return this.fb.group({
      title: [chefData ? chefData.title : '', Validators.required],
      image: [chefData ? chefData.image : '', Validators.required],
      description: [chefData ? chefData.description : '', Validators.required],
    });
  }

  initDishForm(dishData = null) {
    return this.fb.group({
      title: [dishData ? dishData.title : '', Validators.required],
      image: [dishData ? dishData.image : '', Validators.required],
      restaurant: [dishData ? dishData.restaurant : '', Validators.required],
      price: [dishData ? dishData.price : '', Validators.required],
      isSignature: [dishData ? dishData.isSignature : false],
    });
  }
}
