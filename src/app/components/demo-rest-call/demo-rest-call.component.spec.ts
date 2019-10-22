import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoRestCallComponent } from './demo-rest-call.component';

describe('DemoRestCallComponent', () => {
  let component: DemoRestCallComponent;
  let fixture: ComponentFixture<DemoRestCallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemoRestCallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoRestCallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
