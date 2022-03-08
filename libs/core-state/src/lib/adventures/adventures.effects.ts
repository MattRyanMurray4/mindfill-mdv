import { Injectable } from '@angular/core';
import {
  actionTypeNamePastTense,
  actionTypeNamePresentTense,
  AdventuresService,
  getActionType,
  NotifyService,
} from '@mindfill/core-data';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import {
  loadAdventure,
  loadAdventureFailure,
  loadAdventureSuccess,
  loadAdventures,
  loadAdventuresFailure,
  loadAdventuresSuccess,
  createAdventure,
  createAdventureFailure,
  createAdventureSuccess,
  updateAdventure,
  updateAdventureFailure,
  updateAdventureSuccess,
  deleteAdventure,
  deleteAdventureFailure,
  deleteAdventureSuccess,
} from './adventures.actions';
import * as AdventuresActions from './adventures.actions';
import * as AdventuresFeature from './adventures.reducer';
import { catchError, map, of, switchMap, tap } from 'rxjs';

@Injectable()
export class AdventuresEffects {
  loadAdventure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadAdventure),
      switchMap(({ id }) =>
        this.adventureServices.find(id).pipe(
          map((adventure) => loadAdventureSuccess({ adventure })),
          catchError((error) => of(loadAdventureFailure({ error })))
        )
      )
    )
  );

  loadAdventures$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadAdventures),
      switchMap(() =>
        this.adventureServices.all().pipe(
          map((adventures) => loadAdventuresSuccess({ adventures })),
          catchError((error) => of(loadAdventuresFailure({ error })))
        )
      )
    )
  );

  createAdventure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createAdventure),
      switchMap(({ adventure }) =>
        this.adventureServices.create(adventure).pipe(
          map((adventure) => createAdventureSuccess({ adventure })),
          catchError((error) => of(createAdventureFailure({ error })))
        )
      )
    )
  );

  updateAdventure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateAdventure),
      switchMap(({ adventure }) =>
        this.adventureServices.update(adventure).pipe(
          map((adventure) => updateAdventureSuccess({ adventure })),
          catchError((error) => of(updateAdventureFailure({ error })))
        )
      )
    )
  );

  deleteAdventure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteAdventure),
      switchMap(({ adventure }) =>
        this.adventureServices.delete(adventure.id).pipe(
          map((id) => deleteAdventureSuccess({ id })),
          catchError((error) => of(deleteAdventureFailure({ error })))
        )
      )
    )
  );

  adventuresSuccessNotifications$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          updateAdventureSuccess,
          createAdventureSuccess,
          deleteAdventureSuccess
        ),
        tap((action) => {
          const actionType = getActionType(action.type);
          this.notify.notification(
            `Adventure ${actionTypeNamePastTense[actionType]} Successfully!`
          );
        })
      ),
    { dispatch: false }
  );

  adventuresFailureNotifications$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          updateAdventureFailure,
          createAdventureFailure,
          deleteAdventureFailure
        ),
        tap((action) => {
          const actionType = getActionType(action.type);
          this.notify.notification(
            `Failed to ${actionTypeNamePresentTense[actionType]} Adventure. Please try again.`
          );
        })
      ),
    { dispatch: false }
  );

  constructor(
    private readonly actions$: Actions,
    private adventureServices: AdventuresService,
    private notify: NotifyService
  ) {}
}
