import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';

import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { RestaurantsTableComponent } from './components/restaurants-table/restaurants-table.component';
import { ChefsTableComponent } from './components/chefs-table/chefs-table.component';
import { DishesTableComponent } from './components/dishes-table/dishes-table.component';
import { NavBarComponent } from './shared/nav-bar/nav-bar.component';
import { ModalComponent } from './shared/modal/modal.component';
import { TableComponent } from './shared/table/table.component';
import { LoginComponent } from './components/login/login.component';
import { UsersTableComponent } from './components/users-table/users-table.component';
import { ImageDialogComponent } from './shared/image-dialog/image-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    RestaurantsTableComponent,
    ChefsTableComponent,
    DishesTableComponent,
    NavBarComponent,
    ModalComponent,
    TableComponent,
    LoginComponent,
    UsersTableComponent,
    ImageDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatTableModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule,
    MatTooltipModule,
  ],
  providers: [provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}
