import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import * as actions from './actions';
import { DataService } from '../home/services/data.service';
import { Store } from '@ngrx/store';
import { AppState } from './state';
import { savedBars, savedConcrete, savedCoordinates, savedLoads, savedSteel } from './selectors';
import { CalculationInput } from '../shared/models/calculation-input';
import { of } from 'rxjs';
@Injectable()
export class AppEffects {

  constructor(
    private actions$: Actions,
    private readonly dataService: DataService,
    private readonly store: Store<AppState>
  ) { }

  getMaterialsEffect$ = createEffect(() => this.actions$.pipe(
    ofType(actions.requestMaterials),
    switchMap(() => this.dataService.getMaterials().pipe(
      map(material => actions.requestMaterialsOk({ material }))
    )
    )
  ));

  calculateEffect$ = createEffect(() => this.actions$.pipe(
    ofType(actions.requestCalculations),
    withLatestFrom(
      this.store.select(savedConcrete),
      this.store.select(savedSteel),
      this.store.select(savedLoads),
      this.store.select(savedCoordinates),
      this.store.select(savedBars)
    ),
    map(([,concrete,steel,loadCases,sectionCoordinates,bars])=>(<CalculationInput>{
      concrete,
      steel,
      loadCases,
      sectionCoordinates,
      bars
    })),
    switchMap(e => this.dataService.calculate(e).pipe(
      map(result => actions.requestCalculationsOk({ result })),
      catchError(()=> of(actions.requestCalculationsFailed()))
    )
    )
  ));

}
