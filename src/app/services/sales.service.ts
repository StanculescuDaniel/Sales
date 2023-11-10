import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sales } from "../interfaces/sales";
import { Observable, delay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  constructor(private http: HttpClient) { }

  getSales(): Observable<Sales> {
    return this.http.get<Sales>("../assets/potato_sales.json").pipe(delay(2000));
  }

}
