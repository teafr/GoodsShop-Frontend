import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-thank-you',
  imports: [],
  templateUrl: './thank-you.html',
  styleUrl: './thank-you.scss'
})
export class ThankYou {
  constructor(private router: Router) {}

  returnToProducts(): void {
    this.router.navigateByUrl('/products');
  }
}
