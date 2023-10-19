import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { tap, first, Subscription, filter } from 'rxjs';
import { setCircularSection, setModalValid } from 'src/app/store/actions';
import { savedCircularSection } from 'src/app/store/selectors';
import { AppState } from 'src/app/store/state';

@Component({
  selector: 'app-circular-input',
  templateUrl: './circular-input.component.html',
  styleUrls: ['./circular-input.component.scss']
})
export class CircularInputComponent implements OnInit, OnDestroy {
  private changesSubscription!: Subscription;

  form!: FormGroup;

  constructor(private readonly store: Store<AppState>, private readonly formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.store.select(savedCircularSection).pipe(
      tap(e => {
        this.form = this.formBuilder.group({
          diameter: [e.diameter, [Validators.required, Validators.min(1)]],
          barCount: [e.barCount, [Validators.required, Validators.min(1)]],
          barDiameter: [e.barDiameter, [Validators.required, Validators.min(1)]],
          cover: [e.cover, [Validators.required, Validators.min(1)]],
        });
      }),
      first()
    ).subscribe();

    this.changesSubscription = this.form.valueChanges.pipe(
      tap(() => this.store.dispatch(setModalValid({ valid: this.form.valid }))),
      filter(() => this.form.valid),
      tap(e => this.store.dispatch(setCircularSection({ section: { ...e } })))
    ).subscribe();

  }

  ngOnDestroy(): void {
    this.changesSubscription?.unsubscribe();
  }
}
