import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SalesComponent } from './components/sales/sales.component';
import { NewProductComponent } from './components/newproduct/newproduct.component';
import { CounterComponent } from './components/counter/counter.component';
import { canActivateRoute } from './services/auth-guard.service';
import { salesResolver } from './services/sales-router-resolver.service';

const routes: Routes = [
  {path: "", redirectTo: "login", pathMatch: "full"},
  {path: "login", component: LoginComponent},
  {path: "sales", component: SalesComponent, canActivate: [canActivateRoute], resolve: {sales: salesResolver}},
  {path: "countries", canActivate: [canActivateRoute], loadChildren: () => import("./countries/countries.module").then(m => m.CountriesModule)},
  {path: "new", component: NewProductComponent, canActivate: [canActivateRoute]},
  {path: "counter", component: CounterComponent, canActivate: [canActivateRoute]},
  {path: "**", redirectTo: "login", pathMatch: "full"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
