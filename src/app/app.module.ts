import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';

import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { RestaurantsTableComponent } from './components/restaurants-table/restaurants-table.component';
import { ChefsTableComponent } from './components/chefs-table/chefs-table.component';
import { DishesTableComponent } from './components/dishes-table/dishes-table.component';

@NgModule({
  declarations: [
    AppComponent,
    RestaurantsTableComponent,
    ChefsTableComponent,
    DishesTableComponent,
  ],
  imports: [BrowserModule, HttpClientModule, MatTableModule],
  providers: [provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}
