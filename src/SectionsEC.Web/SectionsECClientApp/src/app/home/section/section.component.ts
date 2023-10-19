import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Bar } from 'src/app/shared/models/bar';
import { Point } from 'src/app/shared/models/point';
import {  savedCoordinates, savedBars } from 'src/app/store/selectors';
import { AppState } from 'src/app/store/state';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss']
})
export class SectionComponent implements OnInit {

  coordinates$!: Observable<Point[]>;
  bars$!: Observable<Bar[]>;

  constructor(private readonly store: Store<AppState>){}

  ngOnInit(): void {
    this.coordinates$ = this.store.select(savedCoordinates);
    this.bars$ = this.store.select(savedBars);
  }
}
