import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ProductService } from './product.service';
import { Product } from '../components/models/product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: Map<number, number> = new Map();

  constructor(private productService: ProductService) {
    const storeCart = localStorage.getItem('cart');
    if (storeCart) {
      this.cart = new Map(JSON.parse(storeCart));
    }
  }
  addToCart(productId: number, quantity: number = 1): void {
    debugger;
    if (this.cart.has(productId)) {
      this.cart.set(productId, this.cart.get(productId)! + quantity);
    } else {
      this.cart.set(productId, quantity);
    }
    this.saveCartToLocalStorage();
    // this.cartSubject.next(this.cart); // Phát hiện thay đổi
  }

  getCart(): Map<number, number> {
    return this.cart;
  }

  private saveCartToLocalStorage(): void {
    localStorage.setItem(
      'cart',
      JSON.stringify(Array.from(this.cart.entries()))
    );
  }

  clearCart(): void {
    this.cart.clear();
    this.saveCartToLocalStorage();
  }

  removeFromCart(productId: number): void {
    // Kiểm tra nếu sản phẩm tồn tại trong giỏ hàng thì mới xóa
    if (this.cart.has(productId)) {
      this.cart.delete(productId); // Xóa sản phẩm dựa trên ID
      this.saveCartToLocalStorage(); // Cập nhật lại LocalStorage sau khi xóa
    }
  }
}
