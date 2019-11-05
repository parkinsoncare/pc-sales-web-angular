import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CallMeComponent } from './call-me.component';

describe('CallMeComponent', () => {
  let component: CallMeComponent;
  let fixture: ComponentFixture<CallMeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CallMeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CallMeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
