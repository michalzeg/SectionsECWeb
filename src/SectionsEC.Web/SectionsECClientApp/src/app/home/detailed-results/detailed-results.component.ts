import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, combineLatest, filter, map } from 'rxjs';
import { LoadCaseResult } from 'src/app/shared/models/load-case-result';
import { calculationResultId, calculationResults } from 'src/app/store/selectors';
import { AppState } from 'src/app/store/state';

@Component({
  selector: 'app-detailed-results',
  templateUrl: './detailed-results.component.html',
  styleUrls: ['./detailed-results.component.scss']
})
export class DetailedResultsComponent implements OnInit {

  result$!: Observable<LoadCaseResult>;
  constructor(private readonly store: Store<AppState>) { }

  ngOnInit(): void {
    this.result$ = combineLatest([
      this.store.select(calculationResultId),
      this.store.select(calculationResults)
    ]).pipe(
      map(([id, result]) => Object.keys(result).length === 0 ? {} as LoadCaseResult : result?.loadCaseResults[id])
    );
  }
}
