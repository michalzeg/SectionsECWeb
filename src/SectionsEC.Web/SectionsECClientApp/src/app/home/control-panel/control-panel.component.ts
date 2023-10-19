import { Component, OnInit } from '@angular/core';
import { Message } from 'primeng/api/message';
import { ModalType } from '../../shared/types/modal-type';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/state';
import * as actions from 'src/app/store/actions';
import { CalculationProgressType } from 'src/app/shared/types/calculation-progress-type';
import { Observable, map, of } from 'rxjs';
import { calculationProgress } from 'src/app/store/selectors';


const progressMessageMap = new Map<CalculationProgressType, Message>([
  ['Error', { severity: 'error', summary: 'Error', detail: 'An error has occured' }],
  ['OutOfDate', { severity: 'warn', summary: 'Warning', detail: 'Results are NOT up to date' }],
  ['Processing', { severity: 'info', summary: 'Info', detail: 'Processing...' }],
  ['Success', { severity: 'success', summary: 'Success', detail: 'Results are up to date' }]
]);

const buttonStyleMap = new Map<CalculationProgressType, string>([
  ['Error', 'p-button-lg p-button-danger'],
  ['OutOfDate', 'p-button-lg p-button-warning'],
  ['Processing', 'p-button-lg p-button-info'],
  ['Success', 'p-button-lg p-button-success']
]);

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss']
})
export class ControlPanelComponent implements OnInit {

  messages$: Observable<Message[]> = of([]);
  buttonStyle$: Observable<string> = of('');
  buttonClass$: Observable<string> = of('');

  constructor(private readonly store: Store<AppState>) { }

  ngOnInit(): void {
    this.messages$ = this.store.select(calculationProgress).pipe(
      map(e => progressMessageMap.get(e)),
      map(e => e ? [e] : [])
    );

    this.buttonStyle$ = this.store.select(calculationProgress).pipe(
      map(e => buttonStyleMap.get(e)),
      map(e => e ? e : '')
    );

    this.buttonClass$ = this.store.select(calculationProgress).pipe(
      map(e => e === 'Processing' ? 'pi pi-cog pi-spin' : 'pi pi-cog'),
    );
  }

  openModal(modalType: ModalType) {
    this.store.dispatch(actions.showModal({ modalType }));
  }

  calculate() {
    this.store.dispatch(actions.requestCalculations());
  }

}
