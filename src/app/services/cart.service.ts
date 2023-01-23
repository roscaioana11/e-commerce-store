import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Cart, CartItem } from "../models/cart.model";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
  providedIn: "root",
})
export class CartService {
  cart = new BehaviorSubject<Cart>({ items: [] });

  constructor(private snackBar: MatSnackBar) {}

  addToCart(item: CartItem): void {
    const items = [...this.cart.value.items]; // destructure to not affect the cart items above

    const itemInCart = items.find((cartItem) => cartItem.id === item.id);

    if (itemInCart) {
      itemInCart.quantity += 1;
    } else {
      items.push(item);
    }

    this.cart.next({ items });
    this.snackBar.open("1 item added to the cart.", "Ok", { duration: 3000 });
  }

  getTotal(items: CartItem[]): number {
    return items
      .map((item) => item.price * item.quantity)
      .reduce((previousValue, currentValue) => previousValue + currentValue, 0);
  }

  clearCart(): void {
    this.cart.next({ items: [] });
    this.snackBar.open("Cart is cleared.", "Ok", { duration: 3000 });
  }

  removeFromCart(item: CartItem): void {
    const filteredItems = this.cart.value.items.filter(
      (cartItem) => cartItem.id !== item.id
    );
    this.cart.next({ items: filteredItems });
    this.snackBar.open("1 item removed from the cart.", "Ok", {
      duration: 3000,
    });
  }

  removeQuantity(item: CartItem): void {
    const foundItem = this.cart.value.items.find(
      (cartItem) => cartItem.id === item.id
    );

    if (foundItem) {
      foundItem.quantity--;
      if (foundItem.quantity === 0) {
        this.removeFromCart(foundItem);
      }
    }
  }
}
