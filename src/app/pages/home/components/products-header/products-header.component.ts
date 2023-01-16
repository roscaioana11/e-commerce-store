import { Component, EventEmitter, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-products-header",
  templateUrl: "./products-header.component.html",
})
export class ProductsHeaderComponent implements OnInit {
  // sends the data outside the child component to the parent component
  @Output() columnsCountChange = new EventEmitter<number>();
  sort = "desc";
  itemsShowCount = 12;

  constructor() {}

  ngOnInit(): void {}

  onSortUpdated(newSort: string): void {
    this.sort = newSort;
  }

  onItemsUpdated(count: number): void {
    this.itemsShowCount = count;
  }

  onColumnUpdated(columnNumber: number): void {
    this.columnsCountChange.emit(columnNumber);
  }
}
