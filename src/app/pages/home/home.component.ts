import { Component, OnInit } from "@angular/core";

const ROWS_HEIGHT: { [id: number]: number } = { 1: 400, 3: 355, 4: 350 };

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
})
export class HomeComponent implements OnInit {
  columnPerRow = 3;
  category: string | undefined;
  rowHeight = ROWS_HEIGHT[this.columnPerRow];

  constructor() {}

  ngOnInit(): void {}

  onColumnsCountChange(columnsNumber: number): void {
    this.columnPerRow = columnsNumber;
    this.rowHeight = ROWS_HEIGHT[this.columnPerRow];
  }

  onShowCategory(newCategory: string): void {
    this.category = newCategory;
  }
}
