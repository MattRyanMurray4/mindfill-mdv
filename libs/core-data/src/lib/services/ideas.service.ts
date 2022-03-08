import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Idea } from '@mindfill/api-interfaces';
import { mapTo, tap } from 'rxjs';

export const BASE_URL = 'http://localhost:4200/';

@Injectable({
  providedIn: 'root',
})
export class IdeasService {
  private model = 'ideas';
  constructor(private httpClient: HttpClient) {}

  all() {
    return this.httpClient.get<Idea[]>(this.getUrl()).pipe(tap(console.log));
  }

  find(id: string) {
    return this.httpClient.get<Idea>(this.getUrlById(id));
  }

  create(idea: Idea) {
    return this.httpClient.post<Idea>(this.getUrl(), idea);
  }

  update(idea: Idea) {
    return this.httpClient.patch<Idea>(this.getUrlById(idea.id), idea);
  }

  delete(ideaId: string) {
    return this.httpClient
      .delete<string>(this.getUrlById(ideaId))
      .pipe(mapTo(ideaId));
  }

  private getUrl() {
    return `${BASE_URL}${this.model}`;
  }

  private getUrlById(id: string) {
    return `${this.getUrl}/${id}`;
  }
}
