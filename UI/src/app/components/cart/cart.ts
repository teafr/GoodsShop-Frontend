import { Component, computed, signal } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/cart.model';
import { CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe],
  templateUrl: './cart.html',
  styleUrls: ['./cart.scss']
})
export class Cart {
  items = signal<CartItem[]>([]);
  total = computed(() =>
    this.items().reduce((sum, i) => sum + i.product.price * i.quantity, 0)
  );

  constructor(private cartService: CartService, private router: Router) {
    this.items = this.cartService.cartItemsSig;
  }

  increase(item: CartItem) {
    this.cartService.addToCart(item.product);
  }

  decrease(item: CartItem) {
    this.cartService.updateQuantity(item.product.id, item.quantity - 1);
  }

  remove(productId: string) {
    this.cartService.removeFromCart(productId);
  }

  checkout() {
    this.router.navigateByUrl('/checkout')
  }
}
