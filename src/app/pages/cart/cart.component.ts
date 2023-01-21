import { Component, OnInit } from "@angular/core";
import { Cart, CartItem } from "src/app/models/cart.model";

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

  constructor() {}

  ngOnInit(): void {
    this.dataSource = this.cart.items;
  }

  getTotal(items: CartItem[]): number {
    return items
      .map((item) => item.price * item.quantity)
      .reduce((previousValue, currentValue) => previousValue + currentValue);
  }
}
