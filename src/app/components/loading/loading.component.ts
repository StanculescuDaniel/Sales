import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { AppState } from 'src/app/interfaces/state';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {
  constructor(private store: Store<AppState>){

  }

  showLoading$ = this.store.pipe(
    map(state => state.sales.loading || state.login.loading)
  )

  ngOnInit(): void {
    
  }
}
