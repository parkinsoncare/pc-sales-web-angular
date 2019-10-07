import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StripeSessionComponent } from './stripe-session.component';

describe('StripeSessionComponent', () => {
  let component: StripeSessionComponent;
  let fixture: ComponentFixture<StripeSessionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StripeSessionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StripeSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
