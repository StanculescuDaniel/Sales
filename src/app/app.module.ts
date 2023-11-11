import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ContentComponent } from './components/content/content.component';
import { LoginComponent } from './components/login/login.component';
import { SalesComponent } from './components/sales/sales.component';
import { NewProductComponent } from './components/newproduct/newproduct.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AlertComponent } from './components/alert/alert.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { SortableHeaderComponent } from './components/sortable-header/sortable-header.component';
import { StoreModule } from '@ngrx/store';
import { counterReducer } from './state/counter/counter.reducer';
import { CounterComponent } from './components/counter/counter.component';
import { loginReducer } from './state/login/login.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { LoginEffects } from './state/login/login.effects';
import { salesReducer } from './state/sales/sales.reducer';
import { SalesEffects } from './state/sales/sales.effects';
import { LoadingHttpInterceptor } from './services/loading-http-interceptor';
import { LoadingComponent } from './components/loading/loading.component';
import { EntityDataModule } from '@ngrx/data';
import { entityConfig } from './entity-metadata';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContentComponent,
    LoginComponent,
    SalesComponent,
    NewProductComponent,
    AlertComponent,
    SortableHeaderComponent,
    CounterComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    NgbPaginationModule,
    NgbAlertModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot({ count: counterReducer, login: loginReducer, sales: salesReducer }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    EffectsModule.forRoot([LoginEffects, SalesEffects]),
    EntityDataModule.forRoot(entityConfig)
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: LoadingHttpInterceptor, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
