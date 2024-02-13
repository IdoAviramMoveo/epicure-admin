import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
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
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { GenericModalComponent } from './components/generic-modal/generic-modal.component';
import { GenericTableComponent } from './components/generic-table/generic-table.component';

@NgModule({
  declarations: [
    AppComponent,
    RestaurantsTableComponent,
    ChefsTableComponent,
    DishesTableComponent,
    NavBarComponent,
    GenericModalComponent,
    GenericTableComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
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
