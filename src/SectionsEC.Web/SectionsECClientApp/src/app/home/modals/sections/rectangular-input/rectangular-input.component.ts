import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription, filter, first, tap } from 'rxjs';
import { setModalValid, setRectangularSection } from 'src/app/store/actions';
import { savedRectangularSection } from 'src/app/store/selectors';
import { AppState } from 'src/app/store/state';

@Component({
  selector: 'app-rectangular-input',
  templateUrl: './rectangular-input.component.html',
  styleUrls: ['./rectangular-input.component.scss']
})
export class RectangularInputComponent implements OnInit, OnDestroy {
  private changesSubscription!: Subscription;

  form!: FormGroup;

  constructor(private readonly store: Store<AppState>, private readonly formBuilder: FormBuilder) { }


  ngOnInit(): void {
    this.store.select(savedRectangularSection).pipe(
      tap(e => {
        this.form = this.formBuilder.group({
          width: [e.width, [Validators.required, Validators.min(1)]],
          height: [e.height, [Validators.required, Validators.min(1)]],
          topBarDiameter: [e.topBarDiameter, [Validators.required, Validators.min(1)]],
          topBarCount: [e.topBarCount, [Validators.required, Validators.min(0)]],
          bottomBarDiameter: [e.bottomBarDiameter, [Validators.required, Validators.min(1)]],
          bottomBarCount: [e.bottomBarCount, [Validators.required, Validators.min(1)]],
          cover: [e.cover, [Validators.required, Validators.min(1)]],
        });
      }),
      first()
    ).subscribe();

    this.changesSubscription = this.form.valueChanges.pipe(
      tap(() => this.store.dispatch(setModalValid({ valid: this.form.valid }))),
      filter(() => this.form.valid),
      tap(e => this.store.dispatch(setRectangularSection({ section: { ...e } })))
    ).subscribe();

  }

  ngOnDestroy(): void {
    this.changesSubscription?.unsubscribe();
  }

}
