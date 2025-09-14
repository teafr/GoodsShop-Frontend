import { Component, computed, signal } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/cart-item.model';
import { CurrencyPipe } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe, RouterModule],
  templateUrl: './cart.html',
  styleUrls: ['./cart.scss']
})
export class Cart {
  items = signal<CartItem[]>([]);
  total = computed(() => this.items().reduce((sum, item) => sum + item.product.price * item.quantity, 0));

  constructor(private cartService: CartService) {
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
}
