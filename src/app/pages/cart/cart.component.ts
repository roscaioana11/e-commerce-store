import { Component, OnInit } from "@angular/core";
import { Cart, CartItem } from "src/app/models/cart.model";
import { CartService } from "../../services/cart.service";

@Component({
  selector: "app-cart",
  templateUrl: "cart-component.html",
})
export class CartComponent implements OnInit {
  cart: Cart = {
    items: [
      {
        id: 1,
        product: "http://via.placeholder.com/150",
        name: "Snickers",
        price: 150,
        quantity: 1,
      },
      {
        id: 2,
        product: "http://via.placeholder.com/150",
        name: "Snickers",
        price: 150,
        quantity: 3,
      },
    ],
  };

  dataSource: CartItem[] = [];
  displayColumns: string[] = [
    "product",
    "name",
    "price",
    "quantity",
    "total",
    "action",
  ];

  constructor(private cartService: CartService) {}

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
}
