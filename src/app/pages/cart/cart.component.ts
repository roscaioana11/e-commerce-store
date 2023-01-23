import { Component, OnInit } from "@angular/core";
import { Cart, CartItem } from "src/app/models/cart.model";
import { CartService } from "../../services/cart.service";
import { HttpClient } from "@angular/common/http";
import { loadStripe } from "@stripe/stripe-js";

@Component({
  selector: "app-cart",
  templateUrl: "cart-component.html",
})
export class CartComponent implements OnInit {
  cart: Cart = { items: [] };

  dataSource: CartItem[] = [];
  displayColumns: string[] = [
    "product",
    "name",
    "price",
    "quantity",
    "total",
    "action",
  ];

  constructor(
    private cartService: CartService,
    private httpClient: HttpClient
  ) {}

  ngOnInit(): void {
    this.cartService.cart.subscribe((newCart) => {
      this.cart = newCart;
      this.dataSource = this.cart.items;
    });
  }

  getTotal(items: CartItem[]): number {
    return this.cartService.getTotal(items);
  }

  onClearCart(): void {
    this.cartService.clearCart();
  }

  onRemoveFromCart(item: CartItem): void {
    this.cartService.removeFromCart(item);
  }

  onAddQuantity(item: CartItem): void {
    this.cartService.addToCart(item);
  }

  onRemoveQuantity(item: CartItem): void {
    this.cartService.removeQuantity(item);
  }

  onCheckout(): void {
    this.httpClient
      .post("http://localhost:4242/checkout", {
        items: this.cart.items,
      })
      .subscribe(async (response: any) => {
        // https://stripe.com/
        let stripe = await loadStripe("token key");
        stripe?.redirectToCheckout({
          sessionId: response.id,
        });
      });
  }
}
