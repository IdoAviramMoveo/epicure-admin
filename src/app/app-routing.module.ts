import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RestaurantsTableComponent } from './components/restaurants-table/restaurants-table.component';
import { DishesTableComponent } from './components/dishes-table/dishes-table.component';
import { ChefsTableComponent } from './components/chefs-table/chefs-table.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { UsersTableComponent } from './components/users-table/users-table.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'restaurants',
    component: RestaurantsTableComponent,
    canActivate: [AuthGuard],
  },
  { path: 'dishes', component: DishesTableComponent, canActivate: [AuthGuard] },
  { path: 'chefs', component: ChefsTableComponent, canActivate: [AuthGuard] },
  {
    path: 'users',
    component: UsersTableComponent,
    canActivate: [AuthGuard],
  },
  { path: '', redirectTo: '/restaurants', pathMatch: 'full' },
  { path: '**', redirectTo: '/restaurants' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
