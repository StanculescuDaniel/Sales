import { Component, OnInit } from '@angular/core';
import { AlertInteractionService } from '../../services/alert-interaction.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit{
  error: string | null = null;
  
  constructor(private alertInteraction: AlertInteractionService){

  }

  ngOnInit(): void {
    this.alertInteraction.onError$.subscribe(error => {
      this.error = error;
    });
  }
}
