import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { Referral } from '@mindfill/api-interfaces';

@Component({
  selector: 'mindfill-referral-details',
  templateUrl: './referral-details.component.html',
  styleUrls: ['./referral-details.component.scss'],
})
export class ReferralDetailsComponent {
  currentReferral: Referral;
  originalName: string;

  @Input() form: FormGroup;
  @Input() set referral(value: Referral | null) {
    if (value) this.originalName = value.name;
    this.currentReferral = Object.assign({}, value);
  }

  @Output() saved = new EventEmitter();
  @Output() cancelled = new EventEmitter();

  saveReferral(referral: Referral) {
    this.saved.emit(referral);
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
