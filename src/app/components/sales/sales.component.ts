import { Component, OnInit } from '@angular/core';
import { Column, SubHeader } from '../../interfaces/sales';
import { Data } from '@angular/router';
import { FormControl } from '@angular/forms';
import { SortEvent } from '../../interfaces/sortevent';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/interfaces/state';
import { salesColumnsSelector, salesDataSelector } from 'src/app/state/sales/sales.selectors';
import { Observable, combineLatest, BehaviorSubject } from 'rxjs';
import { map, startWith } from "rxjs/operators";

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {

  search: FormControl = new FormControl("", []);
  valueChanges$ = this.search.valueChanges.pipe(startWith(""));
  sortChanges$ = new BehaviorSubject<SortEvent | null>(null);
  salesData$ = combineLatest([this.valueChanges$, this.store.pipe(select(salesDataSelector)), this.sortChanges$])
    .pipe(
      map(([search, sales, sortEvent]) => {
        return sales.filter(s => s.productName.indexOf(search) !== -1).sort((a,b) => this.salesSortFn(a,b, sortEvent));
      })
    );
  salesColumns$ = this.store.pipe(select(salesColumnsSelector))


  constructor(
    private store: Store<AppState>) {
  }

  ngOnInit(): void {

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

  allowSort(col: Column) {
    return !col.subHeaders || col.subHeaders.length === 0;
  }

  getSubHeaders(): Observable<SubHeader[]> {

    return this.salesColumns$.pipe(
      map(columns => {
        const colWithSubHeader: Column | undefined = columns.find(col => col.subHeaders && col.subHeaders.length > 0);
        if (colWithSubHeader) {
          return colWithSubHeader.subHeaders || [];
        }
        return [];
      }));
  }

  getTotalSum(data: Data): number {
    return data['salesQ1'] + data['salesQ2'] + data['salesQ3'] + data['salesQ4'];
  }

  salesSortFn(a: Data, b: Data, sortEvent: SortEvent | null): number {
    if(sortEvent === null) {
      return 0;
    }

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
  }

  onSortChange(sortEvent: SortEvent) {
    this.sortChanges$.next(sortEvent);
  }
}
