import { Component, OnInit } from '@angular/core';
import { CountryEntityService } from '../../services/country-entity.service';
import { Observable } from 'rxjs';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {
  
  constructor(private entityService: CountryEntityService){

  }

  countries$: Observable<Country[]> = this.entityService.getAll();
  
  ngOnInit(): void {

  }

}
