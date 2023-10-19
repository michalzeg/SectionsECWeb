import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, tap, first, map } from 'rxjs';
import { AppState } from 'src/app/store/state';
import { Steel } from 'src/app/shared/models/steel';
import * as selectors from 'src/app/store/selectors';
import { steelCharChartValues, steelDesignChartValues } from './steel-chart-functions';
import { setSteel } from 'src/app/store/actions';
import { Point } from 'src/app/shared/models/point';


@Component({
  selector: 'app-steel',
  templateUrl: './steel.component.html',
  styleUrls: ['./steel.component.scss']
})
export class SteelComponent implements OnInit{

  designValues$!: Observable<Point[]>;
  charValues$!: Observable<Point[]>;
  options$!: Observable<Steel[]>;

  model!: Steel;

  constructor(private readonly store: Store<AppState>) { }

  ngOnInit(): void {
    this.options$ = this.store.select(selectors.steel).pipe(
    );

    this.store.select(selectors.savedSteel).pipe(
      tap(e=>this.model = e),
      first()
    ).subscribe();

    this.designValues$ = this.store.select(selectors.selectedSteel).pipe(
      map(e => steelDesignChartValues(e))
    );

    this.charValues$ = this.store.select(selectors.selectedSteel).pipe(
      map(e => steelCharChartValues(e))
    );
  }

  onChanged(): void{
    this.store.dispatch(setSteel({steel: this.model}));
  }
}
