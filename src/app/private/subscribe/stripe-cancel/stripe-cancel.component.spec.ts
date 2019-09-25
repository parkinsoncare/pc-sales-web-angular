import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StripeCancelComponent } from './stripe-cancel.component';

describe('StripeCancelComponent', () => {
  let component: StripeCancelComponent;
  let fixture: ComponentFixture<StripeCancelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StripeCancelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StripeCancelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
