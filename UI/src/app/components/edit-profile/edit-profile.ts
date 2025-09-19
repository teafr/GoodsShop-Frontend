import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-profile.html',
  styleUrl: './edit-profile.scss'
})
export class EditProfile implements OnInit{
  @Input() user!: User;
  profileForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.profileForm = this.fb.group({
      lastName: ['', Validators.required],
      firstName: ['', Validators.required],
      patronymic: [''],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.authService.getUser().subscribe(user => {
      this.user = user
      if (this.user) {
        this.profileForm.patchValue(this.user);
      }
    });
  }

  save(): void {
    if (this.profileForm.valid) {
      const updatedUser = { ...this.user, ...this.profileForm.value };
      console.log(`Updated user: ${JSON.stringify(updatedUser)}`);
      this.authService.updateUser(updatedUser).subscribe({
        next: (res) => {
          this.user = updatedUser;
          this.back();
        },
        error: (err) => {
          console.error('Update failed:', err);
        }
      });
    }
  }

  back() {
    this.router.navigateByUrl('/profile');
  }
}
