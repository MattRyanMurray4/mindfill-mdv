import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { Idea } from '@mindfill/api-interfaces';

@Component({
  selector: 'mindfill-idea-details',
  templateUrl: './idea-details.component.html',
  styleUrls: ['./idea-details.component.scss'],
})
export class IdeaDetailsComponent {
  currentIdea: Idea;
  originalTitle: string;

  @Input() set idea(value: Idea | null) {
    if (value) this.originalTitle = value.ideaName;
    this.currentIdea = Object.assign({}, value);
  }

  @Input() form: FormGroup;

  @Output() saved = new EventEmitter();
  @Output() cancelled = new EventEmitter();

  save(idea: Idea) {
    this.saved.emit(idea);
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
