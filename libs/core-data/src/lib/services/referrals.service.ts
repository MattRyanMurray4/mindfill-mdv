import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Referral } from '@mindfill/api-interfaces';
import { mapTo, tap } from 'rxjs';

export const BASE_URL = 'http://localhost:4200/';

@Injectable({
  providedIn: 'root',
})
export class ReferralsService {
  private model = 'referrals';
  constructor(private httpClient: HttpClient) {}

  all() {
    return this.httpClient
      .get<Referral[]>(this.getUrl())
      .pipe(tap(console.log));
  }

  find(id: string) {
    return this.httpClient.get<Referral>(this.getUrlById(id));
  }

  create(referral: Referral) {
    return this.httpClient.post<Referral>(this.getUrl(), referral);
  }
  update(referral: Referral) {
    return this.httpClient.patch<Referral>(
      this.getUrlById(referral.id),
      referral
    );
  }

  delete(referralId: string) {
    return this.httpClient
      .delete<Referral>(this.getUrlById(referralId))
      .pipe(mapTo(referralId));
  }

  private getUrl() {
    return `${BASE_URL}${this.model}`;
  }

  private getUrlById(id: string) {
    return `${this.getUrl}/${id}`;
  }
}
