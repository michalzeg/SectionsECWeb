import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CircularInputComponent } from './circular-input.component';

describe('CircularInputComponent', () => {
  let component: CircularInputComponent;
  let fixture: ComponentFixture<CircularInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CircularInputComponent]
    });
    fixture = TestBed.createComponent(CircularInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
