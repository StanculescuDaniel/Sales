import { Injectable } from '@angular/core';
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';
import { Country } from '../interfaces/country';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountryDataService extends DefaultDataService<Country> {
  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
    super('country', http, httpUrlGenerator);

  }

  override getAll(): Observable<Country[]> {
    return this.http.get<Country[]>("https://restcountries.com/v3.1/all")
  }
}
