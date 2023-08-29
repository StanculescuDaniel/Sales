import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertInteractionService {

  private errorSource = new Subject<string | null>();
  private successSource = new Subject<string | null>();
  onError$ = this.errorSource.asObservable();
  onSuccess$ = this.successSource.asObservable();

  constructor(private router: Router) {
    router.events.subscribe((val) => {
      this.clearAlerts();
    });
  }

  setError(error: string) {
    this.clearAlerts();
    this.errorSource.next(error);
  }

  setSuccess(message: string){
    this.clearAlerts();
    this.successSource.next(message);
  }

  clearAlerts() {
    this.errorSource.next(null);
    this.successSource.next(null);
  }
}
