import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawingBaseComponent } from './drawing-base.component';

describe('DrawingBaseComponent', () => {
  let component: DrawingBaseComponent;
  let fixture: ComponentFixture<DrawingBaseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DrawingBaseComponent]
    });
    fixture = TestBed.createComponent(DrawingBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
