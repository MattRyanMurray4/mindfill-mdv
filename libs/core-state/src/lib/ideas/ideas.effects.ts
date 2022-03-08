import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import {
  loadIdea,
  loadIdeaFailure,
  loadIdeaSuccess,
  loadIdeas,
  loadIdeasFailure,
  loadIdeasSuccess,
  createIdea,
  updateIdea,
  createIdeaFailure,
  createIdeaSuccess,
  updateIdeaFailure,
  updateIdeaSuccess,
  deleteIdea,
  deleteIdeaFailure,
  deleteIdeaSuccess,
} from './ideas.actions';
import * as IdeasActions from './ideas.actions';
import * as IdeasFeature from './ideas.reducer';
import {
  actionTypeNamePastTense,
  actionTypeNamePresentTense,
  getActionType,
  IdeasService,
  NotifyService,
} from '@mindfill/core-data';
import { catchError, map, of, switchMap, tap } from 'rxjs';

@Injectable()
export class IdeasEffects {
  loadIdeas$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadIdeas),
      switchMap(() =>
        this.ideasService.all().pipe(
          map((ideas) => loadIdeasSuccess({ ideas })),
          tap(console.log),
          catchError((error) => of(loadIdeasFailure({ error })))
        )
      )
    )
  );

  loadIdea$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadIdea),
      switchMap(({ id }) =>
        this.ideasService.find(id).pipe(
          map((idea) => loadIdeaSuccess({ idea })),
          catchError((error) => of(loadIdeaFailure({ error })))
        )
      )
    )
  );

  createIdea$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createIdea),
      switchMap(({ idea }) =>
        this.ideasService.create(idea).pipe(
          map((idea) => createIdeaSuccess({ idea })),
          catchError((error) => of(createIdeaFailure({ error })))
        )
      )
    )
  );

  updateIdea$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateIdea),
      switchMap(({ idea }) =>
        this.ideasService.update(idea).pipe(
          map((idea) => updateIdeaSuccess({ idea })),
          catchError((error) => of(updateIdeaFailure({ error })))
        )
      )
    )
  );

  deleteIdea$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteIdea),
      switchMap(({ idea }) =>
        this.ideasService.delete(idea.id).pipe(
          map((id) => deleteIdeaSuccess({ id })),
          catchError((error) => of(deleteIdeaFailure({ error })))
        )
      )
    )
  );

  IdeasSuccessNotifications$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateIdeaSuccess, createIdeaSuccess, deleteIdeaSuccess),
        tap((action) => {
          const actionType = getActionType(action.type);
          this.notify.notification(
            `Idea ${actionTypeNamePastTense[actionType]} Successfully!`
          );
        })
      ),
    { dispatch: false }
  );

  IdeasFailureNotifications$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateIdeaFailure, createIdeaFailure, deleteIdeaFailure),
        tap((action) => {
          const actionType = getActionType(action.type);
          this.notify.notification(
            `Failed to ${actionTypeNamePresentTense[actionType]} Idea. Please try again.`
          );
        })
      ),
    { dispatch: false }
  );

  constructor(
    private readonly actions$: Actions,
    private ideasService: IdeasService,
    private notify: NotifyService
  ) {}
}
