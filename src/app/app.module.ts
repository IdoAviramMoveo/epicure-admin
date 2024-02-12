import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { RestaurantsTableComponent } from './components/restaurants-table/restaurants-table.component';
import { ChefsTableComponent } from './components/chefs-table/chefs-table.component';
import { DishesTableComponent } from './components/dishes-table/dishes-table.component';
import { AddRestaurantModalComponent } from './components/restaurants-table/add-restaurant-modal/add-restaurant-modal.component';
import { EditRestaurantModalComponent } from './components/restaurants-table/edit-restaurant-modal/edit-restaurant-modal.component';
import { AddDishModalComponent } from './components/dishes-table/add-dish-modal/add-dish-modal.component';
import { EditDishModalComponent } from './components/dishes-table/edit-dish-modal/edit-dish-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    RestaurantsTableComponent,
    ChefsTableComponent,
    DishesTableComponent,
    AddRestaurantModalComponent,
    EditRestaurantModalComponent,
    AddDishModalComponent,
    EditDishModalComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatTableModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
  ],
  providers: [provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}
