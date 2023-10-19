import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, combineLatest, map } from 'rxjs';
import { LoadCaseResult } from 'src/app/shared/models/load-case-result';
import { LoadCase } from 'src/app/shared/models/loadCase';
import { calculationResultId, calculationResults, savedLoads } from 'src/app/store/selectors';
import { AppState } from 'src/app/store/state';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  result$!: Observable<LoadCaseResult>;

  results$!: Observable<LoadCaseResult[]>;

  constructor(private readonly store: Store<AppState>) { }

  ngOnInit(): void {

    this.result$ = combineLatest([
      this.store.select(calculationResultId),
      this.store.select(calculationResults)
    ]).pipe(
      map(([id, result]) =>  Object.keys(result).length === 0 ? {} as LoadCaseResult : result?.loadCaseResults[id])
    );

    this.results$ = this.store.select(calculationResults)
      .pipe(
        map(result => result.loadCaseResults)
      );

  }

}
