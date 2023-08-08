import { AbstractControl } from '@angular/forms';

export function ComparePasswords(control: AbstractControl): { [key: string]: boolean } | null {
  if (!control.parent) return null;

  const password = control.parent.get('password');
  const repeatPassword = control;

  if (!password) return null;
  if (password.value === repeatPassword.value) return null;

  return { 'passwordMismatch': true };
} 
