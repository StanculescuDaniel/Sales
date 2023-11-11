import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Country } from '../interfaces/country';

@Injectable({
  providedIn: "root"
})
export class CountryEntityService extends EntityCollectionServiceBase<Country> {

  constructor(serviceElementsFactory:
    EntityCollectionServiceElementsFactory) {
    super("country", serviceElementsFactory);
  }
}
