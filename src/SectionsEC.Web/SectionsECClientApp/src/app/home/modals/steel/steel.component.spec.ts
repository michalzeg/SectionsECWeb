import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SteelComponent } from './steel.component';

describe('SteelComponent', () => {
  let component: SteelComponent;
  let fixture: ComponentFixture<SteelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SteelComponent]
    });
    fixture = TestBed.createComponent(SteelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
