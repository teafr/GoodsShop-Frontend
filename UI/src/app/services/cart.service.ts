import { Injectable, signal } from '@angular/core';
import { CartItem } from '../models/cart.model';
import { Product } from '../models/product.model';
import { environment } from '../../environment/environment';

@Injectable({providedIn: 'root'})
export class CartService {
  cartItemsSig = signal<CartItem[]>([]);
  cartKey = environment.cartKey;

  constructor() {
    const saved = localStorage.getItem(this.cartKey);
    if (saved) {
      this.cartItemsSig.set(JSON.parse(saved));
    }
  }

  private save() {
    localStorage.setItem(this.cartKey, JSON.stringify(this.cartItemsSig()));
  }

  addToCart(product: Product) {
    const items = [...this.cartItemsSig()];
    const existing = items.find(i => i.product.id === product.id);

    if (existing) {
      existing.quantity++;
    } else {
      items.push({ product, quantity: 1 });
    }
    this.cartItemsSig.set(items);
    this.save();
  }

  removeFromCart(productId: string) {
    const items = this.cartItemsSig().filter(i => i.product.id !== productId);
    this.cartItemsSig.set(items);
    this.save();
  }

  clearCart() {
    this.cartItemsSig.set([]);
    localStorage.removeItem(this.cartKey);
  }

  getTotalPrice() {
    return this.cartItemsSig().reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  }
}
