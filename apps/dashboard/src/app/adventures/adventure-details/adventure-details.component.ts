import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { Adventure } from '@mindfill/api-interfaces';

@Component({
  selector: 'mindfill-adventure-details',
  templateUrl: './adventure-details.component.html',
  styleUrls: ['./adventure-details.component.scss'],
})
export class AdventureDetailsComponent {
  currentAdventure: Adventure;
  originalName: string;

  @Input() form: FormGroup;

  @Input() set adventure(value: Adventure | null) {
    if (value) this.originalName = value.adventureName;
    this.currentAdventure = Object.assign({}, value);
  }

  @Output() saved = new EventEmitter();
  @Output() cancelled = new EventEmitter();

  saveAdventure(adventure: Adventure) {
    this.saved.emit(adventure);
  }

  cancel() {
    this.cancelled.emit();
  }

  saveForm(formDirective: FormGroupDirective) {
    if (formDirective.invalid) return;
    this.saved.emit(formDirective.value);
    formDirective.resetForm();
  }
}
