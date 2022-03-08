import { Injectable } from '@angular/core';
import { Adventure } from '@mindfill/api-interfaces';
import { select, Store, Action } from '@ngrx/store';

import * as AdventuresActions from './adventures.actions';
import * as AdventuresFeature from './adventures.reducer';
import * as AdventuresSelectors from './adventures.selectors';

@Injectable()
export class AdventuresFacade {
  loaded$ = this.store.pipe(select(AdventuresSelectors.getAdventuresLoaded));
  allAdventures$ = this.store.pipe(
    select(AdventuresSelectors.getAllAdventures)
  );
  selectedAdventures$ = this.store.pipe(
    select(AdventuresSelectors.getSelected)
  );

  constructor(private readonly store: Store) {}

  init() {
    this.store.dispatch(AdventuresActions.init());
  }

  loadAdventures() {
    return this.store.dispatch(AdventuresActions.loadAdventures());
  }

  loadAdventure(id: string) {
    return this.store.dispatch(AdventuresActions.loadAdventure({ id }));
  }

  selectAdventure(adventureId: string) {
    return this.store.dispatch(
      AdventuresActions.selectAdventure({ adventureId })
    );
  }

  createAdventure(adventure: Adventure) {
    return this.store.dispatch(
      AdventuresActions.createAdventure({ adventure })
    );
  }

  updateAdventure(adventure: Adventure) {
    return this.store.dispatch(
      AdventuresActions.updateAdventure({ adventure })
    );
  }

  deleteAdventure(adventure: Adventure) {
    return this.store.dispatch(
      AdventuresActions.deleteAdventure({ adventure })
    );
  }

  private dispatch(action: Action) {
    return this.store.dispatch(action);
  }
}
