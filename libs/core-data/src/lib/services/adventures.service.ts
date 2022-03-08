import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Adventure } from '@mindfill/api-interfaces';
import { mapTo } from 'rxjs';

export const BASE_URL = '';

@Injectable({
  providedIn: 'root',
})
export class AdventuresService {
  private model = 'adventures';
  constructor(private httpClient: HttpClient) {}

  all() {
    return this.httpClient.get<Adventure[]>(this.getUrl());
  }

  find(id: string) {
    return this.httpClient.get<Adventure>(this.getUrlById(id));
  }

  create(adventure: Adventure) {
    return this.httpClient.post<Adventure>(this.getUrl(), adventure);
  }

  update(adventure: Adventure) {
    return this.httpClient.patch<Adventure>(
      this.getUrlById(adventure.id),
      adventure
    );
  }

  delete(adventureId: string) {
    return this.httpClient
      .delete<Adventure>(this.getUrlById(adventureId))
      .pipe(mapTo(adventureId));
  }

  private getUrl() {
    return `${BASE_URL}${this.model}`;
  }

  private getUrlById(id: string) {
    return `${this.getUrl}/${id}`;
  }
}
