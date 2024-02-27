import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/']);
    }
  }

  onSubmit() {
    this.authService.adminLogin(this.email, this.password).subscribe({
      next: (res) => {
        sessionStorage.setItem('token', res.token);
        this.router.navigate(['/restaurants']);
      },
      error: (err) => {
        const errorMessage =
          err.error?.message || 'An unexpected error occurred.';
        this.snackBar.open(errorMessage, 'Close', {
          duration: 1500,
          panelClass: 'custom-snackbar',
        });
      },
    });
  }
}
