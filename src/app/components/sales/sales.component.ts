import { Component, OnInit } from '@angular/core';
import { SalesService } from '../../services/sales.service';
import { Column, Sales, SubHeader } from '../../interfaces/sales';
import { Data, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { SortEvent } from '../../interfaces/sortevent';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {

  search: FormControl = new FormControl("", []);
  sales: Sales = { column: [], data: [] };
  initialSales: Sales = { column: [], data: [] };

  constructor(
    private salesService: SalesService,
    private loginService: LoginService,
    private router: Router) {

  }

  ngOnInit(): void {

    if(!this.loginService.isUserAuthenticated()) {
      this.router.navigate(['/login']);
      return;
    }

    this.salesService.getSales().subscribe((sales) => {
      this.initialSales = Object.assign({}, sales);
      this.sales = Object.assign({}, sales);
    });

    this.search.valueChanges.subscribe(searchVal => {
      this.sales.data = this.initialSales.data.filter(data => {
        return data.productID.toLowerCase().indexOf(searchVal.toLowerCase()) !== -1 || data.productName.toLowerCase().indexOf(searchVal.toLowerCase()) !== -1;
      });
    });
  }

  getColSpan(col: Column) {
    if (!col.subHeaders) {
      return 1;
    }

    return col.subHeaders.length;
  }

  getRowSpan(col: Column) {
    if (!col.subHeaders) {
      return 2;
    }

    return 1;
  }

  allowSort(col: Column){
    return !col.subHeaders || col.subHeaders.length === 0;
  }

  getSubHeaders(): SubHeader[] {
    const colWithSubHeader: Column | undefined = this.sales.column.find(col => col.subHeaders && col.subHeaders.length > 0);
    if (colWithSubHeader) {
      return colWithSubHeader.subHeaders || [];
    }
    return [];
  }

  getTotalSum(data: Data): number {
    return data['salesQ1'] + data['salesQ2'] + data['salesQ3'] + data['salesQ4'];
  }

  onSortChange(sortEvent: SortEvent) {
    this.sales.data = this.sales.data.sort((a: Data, b: Data) => {
      const nameA = a[sortEvent.sortKey];
      const nameB = b[sortEvent.sortKey];

      if (sortEvent.direction === "asc") {
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
      } else {
        if (nameA < nameB) {
          return 1;
        }
        if (nameA > nameB) {
          return -1;
        }
      }
      return 0;
    });
  }

}
