import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { first, tap } from 'rxjs';
import { LoadCase, emptyLoad, isValidLoad } from 'src/app/shared/models/loadCase';
import { removeLoad, setLoad, setModalValid } from 'src/app/store/actions';
import { selectedLoads } from 'src/app/store/selectors';
import { AppState } from 'src/app/store/state';

@Component({
  selector: 'app-loads',
  templateUrl: './loads.component.html',
  styleUrls: ['./loads.component.scss']
})
export class LoadsComponent implements OnInit {
  loads: LoadCase[] = [];

  constructor(private readonly store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.select(selectedLoads).pipe(
      tap(e => this.loads = [...e].map(f => ({ ...f }))),
      first()
    ).subscribe();
  }

  onAddLoad() {
    const load = emptyLoad();
    this.loads = [...this.loads, load];
    this.store.dispatch(setLoad({ load, index: this.loads.length }));
  }

  onModelChanged(index: number) {
    const load = { ...this.loads[index] };
    if (isValidLoad(load)) {
      this.store.dispatch(setModalValid({ valid: true }));
      this.store.dispatch(setLoad({ load, index }));
    }
    else {
      this.store.dispatch(setModalValid({ valid: false }));
    }
  }

  onRemove(index: number){
    this.loads = [...this.loads.slice(0, index), ...this.loads.slice(index+1)]
    this.store.dispatch(removeLoad({index}));
  }

}
