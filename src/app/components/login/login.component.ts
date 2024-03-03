import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  emailInvalid: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder
  ) {
    this.loginForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern(/^.+@.+\..+$/),
        ],
      ],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/']);
    }
    this.loginForm.get('email').statusChanges.subscribe((status) => {
      this.emailInvalid =
        status === 'INVALID' && this.loginForm.get('email').touched;
    });
  }

  emailBlurHandler() {
    this.emailInvalid =
      this.loginForm.get('email').touched &&
      this.loginForm.get('email').invalid;
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    const { email, password } = this.loginForm.value;
    this.authService.adminLogin(email, password).subscribe({
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
