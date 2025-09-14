import { Injectable, signal } from '@angular/core';
import { CartItem } from '../models/cart-item.model';
import { Product } from '../models/product.model';
import { environment } from '../../environment/environment';

@Injectable({ providedIn: 'root' })
export class CartService {
  cartItemsSig = signal<CartItem[]>([]);
  cartKey = environment.cartKey;

  constructor() {
    const saved = localStorage.getItem(this.cartKey);
    if (saved) this.cartItemsSig.set(JSON.parse(saved));
  }
  
  private save() {
    localStorage.setItem(this.cartKey, JSON.stringify(this.cartItemsSig()));
  }

  addToCart(product: Product) {
    this.cartItemsSig.update(items => {
      const found = items.find(i => i.product.id === product.id);
      if (found) found.quantity++;
      else items.push({ product, quantity: 1 });
      return [...items];
    });
  }

  removeFromCart(productId: string) {
    this.cartItemsSig.set(this.cartItemsSig().filter(i => i.product.id !== productId));
    this.save();
  }

  clearCart() {
    this.cartItemsSig.set([]);
    localStorage.removeItem(this.cartKey);
  }

  getTotalPrice() {
    return this.cartItemsSig().reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }

  updateQuantity(productId: string, quantity: number) {
    const items = [...this.cartItemsSig()];
    const existing = items.find(i => i.product.id === productId);

    if (existing) {
      if (quantity > 0) {
        existing.quantity = quantity;
      } else {
        const index = items.indexOf(existing);
        items.splice(index, 1);
      }
      this.cartItemsSig.set(items);
      this.save();
    }
  }
}
