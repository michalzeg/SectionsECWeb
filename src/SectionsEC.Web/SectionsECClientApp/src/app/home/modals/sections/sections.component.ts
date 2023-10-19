import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map, of } from 'rxjs';
import { Bar } from 'src/app/shared/models/bar';
import { Point } from 'src/app/shared/models/point';
import { SectionType } from 'src/app/shared/types/section-type';
import { setSectionType } from 'src/app/store/actions';
import { selectedBars, selectedCoordinates, selectedSectionType } from 'src/app/store/selectors';
import { AppState } from 'src/app/store/state';

const sectionsSequence: SectionType[] = [
  'Rectangular',
  'Circular',
  'Custom'
];

@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.scss']
})
export class SectionsComponent implements OnInit {

  activeIndex$: Observable<number> = of(0);

  coordinates$!: Observable<Point[]>;
  bars$!: Observable<Bar[]>;

  constructor(private readonly store: Store<AppState>){}

  ngOnInit(): void {
    this.coordinates$ = this.store.select(selectedCoordinates);
    this.bars$ = this.store.select(selectedBars);
    this.activeIndex$ = this.store.select(selectedSectionType).pipe(
      map(e=>sectionsSequence.indexOf(e))
    );
  }

  indexChanged(index: number){
    const sectionType = sectionsSequence[index];
    this.store.dispatch(setSectionType({sectionType: sectionType}));
  }

}
