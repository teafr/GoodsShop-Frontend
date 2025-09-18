import { AbstractControl, ValidationErrors } from '@angular/forms';

export function passwordsMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password')?.value;
  const confirmPassword = control.get('confirmationPassword')?.value;

  if (password && confirmPassword && password !== confirmPassword) {
    return { passwordsMismatch: true };
  }
  
  return null;
}
