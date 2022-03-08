import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { emptyIdea, emptyReferral, Referral } from '@mindfill/api-interfaces';
import { ReferralsFacade } from '@mindfill/core-state';
import { Observable } from 'rxjs';

@Component({
  selector: 'mindfill-referrals',
  templateUrl: './referrals.component.html',
  styleUrls: ['./referrals.component.scss'],
})
export class ReferralsComponent implements OnInit {
  form: FormGroup;
  referrals$: Observable<Referral[]> = this.referralsFacade.allReferrals$;
  selectedReferral$: Observable<Referral> =
    this.referralsFacade.selectedReferrals$;
  constructor(
    private referralsFacade: ReferralsFacade,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.referralsFacade.loadReferrals();
    this.initForm();
    this.resetReferral();
  }

  selectReferral(referral: Referral) {
    this.referralsFacade.selectReferral(referral.id);
    this.form.patchValue(referral);
  }

  resetReferral() {
    this.selectReferral(emptyReferral);
    this.form.reset();
  }

  createReferral(referral: Referral) {
    this.referralsFacade.createReferral(referral);
    this.resetReferral();
  }

  updateReferral(referral: Referral) {
    this.referralsFacade.updateReferral(referral);
    // this.resetReferral()
  }

  saveReferral(referral: Referral) {
    referral.id
      ? this.referralsFacade.updateReferral(referral)
      : this.referralsFacade.createReferral(referral);
    // this.resetReferral()
  }

  deleteReferral(referral: Referral) {
    this.referralsFacade.deleteReferral(referral);
  }

  cancel() {
    this.resetReferral();
  }

  private initForm() {
    this.form = this.formBuilder.group({
      id: null,
      name: ['', Validators.required],
      facility: ['', Validators.required],
      phoneNumber: [''],
      roomNumber: ['', Validators.required],
      processed: [''],
    });
  }
}
