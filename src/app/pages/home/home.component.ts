import { Component, OnInit } from "@angular/core";
import { Product } from "../../models/product.model";
import { CartService } from "../../services/cart.service";

const ROWS_HEIGHT: { [id: number]: number } = { 1: 400, 3: 355, 4: 350 };

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
})
export class HomeComponent implements OnInit {
  columnPerRow = 3;
  category: string | undefined;
  rowHeight = ROWS_HEIGHT[this.columnPerRow];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {}

  onColumnsCountChange(columnsNumber: number): void {
    this.columnPerRow = columnsNumber;
    this.rowHeight = ROWS_HEIGHT[this.columnPerRow];
  }

  onShowCategory(newCategory: string): void {
    this.category = newCategory;
  }

  onAddToCart(product: Product): void {
    this.cartService.addToCart({
      id: product.id,
      product: product.image,
      name: product.title,
      price: product.price,
      quantity: 1,
    });
  }
}
