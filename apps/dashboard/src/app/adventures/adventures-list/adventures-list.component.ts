import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Adventure } from '@mindfill/api-interfaces';

@Component({
  selector: 'mindfill-adventures-list',
  templateUrl: './adventures-list.component.html',
  styleUrls: ['./adventures-list.component.scss'],
})
export class AdventuresListComponent {
  @Input() adventures: Adventure[] | null;
  @Input() readonly = false;
  @Output() selected = new EventEmitter();
  @Output() deleted = new EventEmitter();
}
