import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CountriesRoutingModule } from './countries-routing.module';
import { StoreModule } from '@ngrx/store';
import * as reducers from './state/countries.reducers';
import { EntityDataService, EntityDefinitionService, EntityMetadataMap } from '@ngrx/data';
import { CountryEntityService } from './services/country-entity.service';
import { CountryDataService } from './services/country-data.service';
import { Country } from './interfaces/country';
import { CountriesComponent } from './components/countries/countries.component';


const entityMetaData: EntityMetadataMap = {
  country: {
     selectId: (s: Country) => s.name.common
  }
}

@NgModule({
  declarations: [CountriesComponent],
  providers: [CountryEntityService, CountryDataService],
  imports: [
    CommonModule,
    CountriesRoutingModule,
    StoreModule.forFeature(reducers.countriesFeatureKey, reducers.reducers, { metaReducers: reducers.metaReducers })
  ],
})
export class CountriesModule {

  constructor(private eds: EntityDefinitionService,
    private entityDataService: EntityDataService,
    private countryDataService: CountryDataService) {

    eds.registerMetadataMap(entityMetaData);
    entityDataService.registerService("country", countryDataService);

  }
}
