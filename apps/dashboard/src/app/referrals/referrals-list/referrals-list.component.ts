import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Referral } from '@mindfill/api-interfaces';

@Component({
  selector: 'mindfill-referrals-list',
  templateUrl: './referrals-list.component.html',
  styleUrls: ['./referrals-list.component.scss'],
})
export class ReferralsListComponent {
  @Input() referrals: Referral[] | null;
  @Input() readonly = false;
  @Output() selected = new EventEmitter();
  @Output() deleted = new EventEmitter();
}
