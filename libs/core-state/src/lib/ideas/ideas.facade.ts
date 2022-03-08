import { Injectable } from '@angular/core';
import { Idea } from '@mindfill/api-interfaces';
import { Action, select, Store } from '@ngrx/store';
import * as IdeasActions from './ideas.actions';
import * as IdeasSelectors from './ideas.selectors';

@Injectable()
export class IdeasFacade {
  loaded$ = this.store.pipe(select(IdeasSelectors.getIdeasLoaded));
  allIdeas$ = this.store.pipe(select(IdeasSelectors.getAllIdeas));
  selectedIdeas$ = this.store.pipe(select(IdeasSelectors.getSelected));

  constructor(private readonly store: Store) {}

  init() {
    return this.store.dispatch(IdeasActions.init());
  }

  loadIdea(idea: Idea) {
    return this.store.dispatch(IdeasActions.loadIdea(idea));
  }

  loadIdeas() {
    return this.store.dispatch(IdeasActions.loadIdeas());
  }

  selectIdea(ideaId: string) {
    return this.store.dispatch(IdeasActions.selectIdea({ ideaId }));
  }

  createIdea(idea: Idea) {
    return this.store.dispatch(IdeasActions.createIdea({ idea }));
  }

  updateIdea(idea: Idea) {
    return this.store.dispatch(IdeasActions.updateIdea({ idea }));
  }

  deleteIdea(idea: Idea) {
    return this.store.dispatch(IdeasActions.deleteIdea({ idea }));
  }

  private dispatch(action: Action) {
    return this.store.dispatch(action);
  }
}
