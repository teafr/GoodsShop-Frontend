import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { passwordsMatchValidator } from '../../validators/validators';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {
  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { 
    this.form = this.formBuilder.group({
      lastName: ['', Validators.required],
      firstName: ['', Validators.required],
      patronymic: [''],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^0\d{9}$/)]],
      address: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmationPassword: ['', Validators.required]
    }, { validators: passwordsMatchValidator });
  }

  onSubmit() {
    if (this.form.valid) {
      const { confirmationPassword, password, ...userData } = this.form.value;
      this.authService.register(userData, password).subscribe(() => {
        this.router.navigateByUrl('/products');
      });
    } else {
      console.log('Form is invalid');
    }
  }

}
