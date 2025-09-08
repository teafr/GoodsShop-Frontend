import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { Sale } from '../../models/sale.model';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { SaleService } from '../../services/sale.service';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [CurrencyPipe, DatePipe],
  templateUrl: './profile.html',
  styleUrl: './profile.scss'
})
export class Profile implements OnInit {
  user: User | null = null;
  salesHistory: Sale[] = [];

  constructor(private authService: AuthService, private router: Router, private saleService: SaleService) {}

  ngOnInit(): void {
    this.authService.getUser().subscribe(user => {
      this.user = user;
      this.saleService.getUserSales(user.id).subscribe(sales => this.salesHistory = sales);
    });
  }

  edit() {
    this.router.navigateByUrl('/edit-profile');
  }
}
