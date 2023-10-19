import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RectangularInputComponent } from './rectangular-input.component';

describe('RectangularInputComponent', () => {
  let component: RectangularInputComponent;
  let fixture: ComponentFixture<RectangularInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RectangularInputComponent]
    });
    fixture = TestBed.createComponent(RectangularInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
