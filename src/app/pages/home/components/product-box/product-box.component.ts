import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Product } from "../../../../models/product.model";

@Component({
  selector: "app-product-box",
  templateUrl: "product-box.component.html",
})
export class ProductBoxComponent implements OnInit {
  @Output() addToCart = new EventEmitter();
  @Input() fullWidthMode = false;

  product: Product | undefined = {
    id: 1,
    title: "Snickers",
    price: 150,
    category: "shoes",
    description: "Description",
    image: "http://via.placeholder.com/150",
  };

  constructor() {}

  ngOnInit(): void {}

  onAddToCart(): void {
    this.addToCart.emit(this.product);
  }
}
