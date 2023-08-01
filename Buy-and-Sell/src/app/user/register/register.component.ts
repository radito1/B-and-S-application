import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router,
  ) {}

  form!: FormGroup;

  get usernameControl() {
    return this.form.get('username') as FormControl;
  }
  get passwordControl() {
    return this.form.get('password') as FormControl;
  }
  get emailControl() {
    return this.form.get('email') as FormControl;
  }

  ngOnInit(): void {
    this.generateForm();
  }
  generateForm() {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    this.authService
      .register(
        this.emailControl.value,
        this.passwordControl.value,
        this.usernameControl.value
      ).then(() => {
        this.snackBar.open('You registered successfuly!');
        this.router.navigate(['/']);
      })
      .catch((err) => {
        this.snackBar.open(
          'There was a problem while trying to sign up a new user'
        );
      });
    
  }
}
