import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RestaurantsTableComponent } from './components/restaurants-table/restaurants-table.component';
import { DishesTableComponent } from './components/dishes-table/dishes-table.component';
import { ChefsTableComponent } from './components/chefs-table/chefs-table.component';

const routes: Routes = [
  { path: 'restaurants', component: RestaurantsTableComponent },
  { path: 'dishes', component: DishesTableComponent },
  { path: 'chefs', component: ChefsTableComponent },
  { path: '', redirectTo: '/restaurants', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
