import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { tap, first, Subscription, filter } from 'rxjs';
import { setCustomSection, setModalValid } from 'src/app/store/actions';
import { savedCustomSection } from 'src/app/store/selectors';
import { AppState } from 'src/app/store/state';

const coordiantesPattern = /^(-?\d+;-?\d+\s)*-?\d+;-?\d+$/;
const barPattern = /^(-?\d+;-?\d+;-?\d+\s)*-?\d+;-?\d+;-?\d+$/;

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss']
})
export class CustomInputComponent implements OnInit, OnDestroy {

  private changesSubscription!: Subscription;

  form!: FormGroup;
  constructor(private readonly store: Store<AppState>, private readonly formBuilder: FormBuilder){}

  ngOnInit(): void {
    this.store.select(savedCustomSection).pipe(
      tap(e => {
        this.form = this.formBuilder.group({
          sectionCoordinates: [e.sectionCoordinates, [Validators.required, Validators.pattern(coordiantesPattern)]],
          barCoordinates: [e.barCoordinates, [Validators.required, Validators.pattern(barPattern)]],
        });
      }),
      first()
    ).subscribe();

    this.changesSubscription = this.form.valueChanges.pipe(
      tap(() => this.store.dispatch(setModalValid({ valid: this.form.valid }))),
      filter(() => this.form.valid),
      tap(e => this.store.dispatch(setCustomSection({ section: { ...e } })))
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.changesSubscription?.unsubscribe();
  }
}
