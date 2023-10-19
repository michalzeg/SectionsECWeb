import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { LoadCase } from 'src/app/shared/models/loadCase';
import { setResultId } from 'src/app/store/actions';
import { savedConcrete, savedLoads, savedSteel } from 'src/app/store/selectors';
import { AppState } from 'src/app/store/state';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {
  concreteGrade$!: Observable<string>;
  steelGrade$!: Observable<string>;

  loads$!: Observable<LoadCase[]>;

  model!: LoadCase | null;

  constructor(private readonly store: Store<AppState>) { }

  ngOnInit(): void {
    this.concreteGrade$ = this.store.select(savedConcrete).pipe(
      map(e => e.grade)
    );
    this.steelGrade$ = this.store.select(savedSteel).pipe(
      map(e => e.grade)
    );

    this.loads$ = this.store.select(savedLoads);
  }

  changed(){
    this.store.dispatch(setResultId({id: this.model?.id ?? 0}));
  }
}
