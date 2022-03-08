import { Injectable } from '@angular/core';
import {
  actionTypeNamePastTense,
  actionTypeNamePresentTense,
  getActionType,
  NotifyService,
  ReferralsService,
} from '@mindfill/core-data';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import {
  createReferral,
  createReferralFailure,
  createReferralSuccess,
  deleteReferral,
  deleteReferralFailure,
  deleteReferralSuccess,
  loadReferral,
  loadReferralFailure,
  loadReferrals,
  loadReferralsFailure,
  loadReferralsSuccess,
  loadReferralSuccess,
  updateReferral,
  updateReferralFailure,
  updateReferralSuccess,
} from './referrals.actions';

@Injectable()
export class ReferralsEffects {
  loadReferral$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadReferral),
      switchMap(({ id }) =>
        this.referralsService.find(id).pipe(
          map((referral) => loadReferralSuccess({ referral })),
          tap(console.log),
          catchError((error) => of(loadReferralFailure({ error })))
        )
      )
    )
  );

  loadReferrals$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadReferrals),
      switchMap(() =>
        this.referralsService.all().pipe(
          map((referrals) => loadReferralsSuccess({ referrals })),
          catchError((error) => of(loadReferralsFailure({ error })))
        )
      )
    )
  );

  createReferrals$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createReferral),
      switchMap(({ referral }) =>
        this.referralsService.create(referral).pipe(
          map((referral) => createReferralSuccess({ referral })),
          catchError((error) => of(createReferralFailure({ error })))
        )
      )
    )
  );

  updateReferral$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateReferral),
      switchMap(({ referral }) =>
        this.referralsService.update(referral).pipe(
          map((referral) => updateReferralSuccess({ referral })),
          catchError((error) => of(updateReferralFailure({ error })))
        )
      )
    )
  );

  deleteReferral$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteReferral),
      switchMap(({ referral }) =>
        this.referralsService.delete(referral.id).pipe(
          map((id) => deleteReferralSuccess({ id })),
          catchError((error) => of(deleteReferralFailure({ error })))
        )
      )
    )
  );

  referralsSuccessNotifications$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          updateReferralSuccess,
          createReferralSuccess,
          deleteReferralSuccess
        ),
        tap((action) => {
          const actionType = getActionType(action.type);
          this.notify.notification(
            `Referrals ${actionTypeNamePastTense[actionType]} Successfully!`
          );
        })
      ),
    { dispatch: false }
  );

  referralsFailureNotifications$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          updateReferralFailure,
          createReferralFailure,
          deleteReferralFailure
        ),
        tap((action) => {
          const actionType = getActionType(action.type);
          this.notify.notification(
            `Failed to ${actionTypeNamePresentTense[actionType]} Referrals. Please try again.`
          );
        })
      ),
    { dispatch: false }
  );

  constructor(
    private readonly actions$: Actions,
    private referralsService: ReferralsService,
    private notify: NotifyService
  ) {}
}
