import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SortEvent } from '../../interfaces/sortevent';

@Component({
  selector: 'app-sortable-header',
  templateUrl: './sortable-header.component.html',
  styleUrls: ['./sortable-header.component.css']
})
export class SortableHeaderComponent {
  @Input() sortKey: string = ''; 
  @Input() sortDirection: 'asc' | 'desc' = 'asc'; 
  @Output() sortChange = new EventEmitter<SortEvent>();

  sort() {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.sortChange.emit({sortKey: this.sortKey, direction: this.sortDirection});
  }
}