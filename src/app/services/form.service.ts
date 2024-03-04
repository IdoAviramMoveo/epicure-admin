import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormArray } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  constructor(private fb: FormBuilder) {}

  initRestaurantForm(restaurantData = null) {
    let chefId = '';
    if (
      restaurantData &&
      restaurantData.chef &&
      typeof restaurantData.chef === 'object'
    ) {
      chefId = restaurantData.chef._id;
    } else if (restaurantData && typeof restaurantData.chef === 'string') {
      chefId = restaurantData.chef;
    }

    return this.fb.group({
      title: [restaurantData ? restaurantData.title : '', Validators.required],
      image: [restaurantData ? restaurantData.image : '', Validators.required],
      chef: [
        restaurantData && restaurantData.chef ? restaurantData.chef._id : '',
        Validators.required,
      ],
      rating: [restaurantData ? restaurantData.rating : 1, Validators.required],
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
      restaurant: [
        dishData && dishData.restaurant ? dishData.restaurant._id : '',
        Validators.required,
      ],
      price: [dishData ? dishData.price : '', Validators.required],
      tags: [dishData ? dishData.tags : []],
      ingredients: this.fb.array(
        dishData && dishData.ingredients
          ? dishData.ingredients.map((ingredient) =>
              this.fb.control(ingredient)
            )
          : []
      ),
      isSignature: [dishData ? dishData.isSignature : false],
    });
  }

  initUserForm(userData = null) {
    return this.fb.group({
      name: [userData ? userData.name : '', Validators.required],
      surname: [userData ? userData.surname : '', Validators.required],
      email: [userData ? userData.email : '', Validators.required],
      password: [userData ? userData.password : '', Validators.required],
      role: [userData ? userData.role : 'USER', Validators.required],
    });
  }

  addIngredient(ingredients: FormArray) {
    ingredients.push(this.fb.control('', Validators.required));
  }

  removeIngredient(ingredients: FormArray, index: number) {
    ingredients.removeAt(index);
  }
}
