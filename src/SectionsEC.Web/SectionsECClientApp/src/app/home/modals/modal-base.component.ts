import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { selectCurrentModal, selectIsModalValid } from 'src/app/store/selectors';
import { AppState } from 'src/app/store/state';
import { ModalType } from '../../shared/types/modal-type';
import * as actions from 'src/app/store/actions';

@Component({
  selector: 'app-modal-base',
  templateUrl: './modal-base.component.html',
  styleUrls: ['./modal-base.component.scss']
})
export class ModalBaseComponent implements OnInit {

  modalType$!: Observable<ModalType>;

  visible$!: Observable<boolean>;
  disabled$!: Observable<boolean>;

  constructor(private readonly store: Store<AppState>) { }

  ngOnInit(): void {

    this.modalType$ = this.store.select(selectCurrentModal);

    this.visible$ = this.store.select(selectCurrentModal).pipe(
      map(e => e !== 'None')
    );

    this.disabled$ = this.store.select(selectIsModalValid).pipe(
      map(e=>!e)
    );
  }

  visibleChanged(visible: boolean): void{
    if (!visible){
      this.close();
    }
  }

  save(): void {
    this.store.dispatch(actions.saveModal());

  }

  close(): void {
    this.store.dispatch(actions.closeModal());
  }

  isVisible(modalType: ModalType): Observable<boolean>{
    return this.modalType$.pipe(
      map(e => e === modalType)
    );
  }

}
