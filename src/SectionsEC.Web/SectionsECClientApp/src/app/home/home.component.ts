import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as  actions from '../store/actions';
import { AppState } from '../store/state';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  constructor(private readonly store: Store<AppState>){}



  ngOnInit(): void {
    this.store.dispatch(actions.requestMaterials());
  }

}
