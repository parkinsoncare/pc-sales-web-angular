import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StripeThanksComponent } from './stripe-thanks.component';

describe('StripeThanksComponent', () => {
  let component: StripeThanksComponent;
  let fixture: ComponentFixture<StripeThanksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StripeThanksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StripeThanksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
