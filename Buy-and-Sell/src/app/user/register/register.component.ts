import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { appEmailValidator } from 'src/app/shared/validators/email-validator';
import { ComparePasswords } from 'src/app/shared/validators/password-match-validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  get usernameControl() {
    return this.form.get('username') as FormControl;
  }
  get passwordControl() {
    return this.form.get('password') as FormControl;
  }
  get emailControl() {
    return this.form.get('email') as FormControl;
  }
  get rePasswordControl() {
    return this.form.get('rePassword') as FormControl;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, appEmailValidator()]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rePassword: ['', [Validators.required, ComparePasswords]],
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    const { username, email, password } = this.form.value;

    this.authService.register(email, password, username);
  }
}
