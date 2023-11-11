import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertInteractionService } from '../../services/alert-interaction.service';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { AppState } from 'src/app/interfaces/state';
import { Store } from '@ngrx/store';
import { salesActions } from 'src/app/state/sales/sales.actions';
import { Data } from 'src/app/interfaces/sales';

@Component({
  selector: 'app-newproduct',
  templateUrl: './newproduct.component.html',
  styleUrls: ['./newproduct.component.css']
})
export class NewProductComponent implements OnInit {

  form!: FormGroup;
  inputProductName: FormControl = new FormControl("", [Validators.required, Validators.maxLength(50)]);
  inputProductId: FormControl<number | null> = new FormControl<number | null>(null, [Validators.required, Validators.max(Number("9".repeat(13)))]);
  inputProductManager: FormControl = new FormControl("", [Validators.maxLength(30)]);
  inputProductStartDate: FormControl<Date | null> = new FormControl<Date | null>(null, [Validators.required]);

  constructor(
    private alertInteraction: AlertInteractionService,
    private store: Store<AppState>,
    private loginService: LoginService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.form = new FormGroup(
      {
        inputProductName: this.inputProductName,
        inputProductId: this.inputProductId,
        inputProductManager: this.inputProductManager,
        inputProductStartDate: this.inputProductStartDate
      });
  }

  private isFieldValid(field: FormControl<any>) {
    return field != null && field.invalid && field.dirty;
  }

  isNameInvalid(): boolean {
    return this.isFieldValid(this.inputProductName);
  }

  isIdInvalid(): boolean {
    return this.isFieldValid(this.inputProductId);
  }

  isManagerInvalid(): boolean {
    return this.isFieldValid(this.inputProductManager);
  }

  isSalesDateInvalid(): boolean {
    return this.isFieldValid(this.inputProductStartDate);
  }

  clear(): void {
    this.form.reset();
  }

  addProduct(): void {
    const productID = this.inputProductId.value?.toString();
    if(!productID) {
      return;
    }

    const product: Data = {
      productID: productID,
      productName: this.inputProductName.value,
      salesQ1: 0,
      salesQ2: 0,
      salesQ3: 0,
      salesQ4: 0
    };
    this.store.dispatch(salesActions.add(product));
    this.alertInteraction.setSuccess(`Product "${this.inputProductName.value}" was added successfully.`);
    this.clear();
  }

  disableAddButton(): boolean {
    return this.form.invalid;
  }

}
