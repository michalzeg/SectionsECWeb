import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, first, map, tap } from 'rxjs';
import { Point } from 'src/app/shared/models/point';
import * as selectors from 'src/app/store/selectors';
import { AppState } from 'src/app/store/state';
import { concreteCharChartValues, concreteDesignChartValues } from './concrete-chart-functions';
import { Concrete } from 'src/app/shared/models/concrete';
import * as actions  from 'src/app/store/actions';

@Component({
  selector: 'app-concrete',
  templateUrl: './concrete.component.html',
  styleUrls: ['./concrete.component.scss']
})
export class ConcreteComponent implements OnInit {


  designValues$!: Observable<Point[]>;
  charValues$!: Observable<Point[]>;
  options$!: Observable<Concrete[]>;

  model!: Concrete;

  constructor(private readonly store: Store<AppState>) { }

  ngOnInit(): void {
    this.options$ = this.store.select(selectors.concrete).pipe(
    );

    this.store.select(selectors.savedConcrete).pipe(
      tap(e=>this.model = e),
      first()
    ).subscribe();

    this.designValues$ = this.store.select(selectors.selectedConcrete).pipe(
      map(e => concreteDesignChartValues(e))
    );

    this.charValues$ = this.store.select(selectors.selectedConcrete).pipe(
      map(e => concreteCharChartValues(e))
    );
  }

  onChanged(): void{
    this.store.dispatch(actions.setConcrete({concrete: this.model}));
  }

}

