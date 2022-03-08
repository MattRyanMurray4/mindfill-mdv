import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Idea } from '@mindfill/api-interfaces';

@Component({
  selector: 'mindfill-ideas-list',
  templateUrl: './ideas-list.component.html',
  styleUrls: ['./ideas-list.component.scss'],
})
export class IdeasListComponent {
  @Input() ideas: Idea[] | null;
  @Input() readonly = false;
  @Output() selected = new EventEmitter();
  @Output() deleted = new EventEmitter();
}
