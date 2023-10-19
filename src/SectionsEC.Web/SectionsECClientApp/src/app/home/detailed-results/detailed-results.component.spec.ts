import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedResultsComponent } from './detailed-results.component';

describe('DetailedResultsComponent', () => {
  let component: DetailedResultsComponent;
  let fixture: ComponentFixture<DetailedResultsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailedResultsComponent]
    });
    fixture = TestBed.createComponent(DetailedResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
