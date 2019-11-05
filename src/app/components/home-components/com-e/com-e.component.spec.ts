import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComEComponent } from './com-e.component';

describe('ComEComponent', () => {
  let component: ComEComponent;
  let fixture: ComponentFixture<ComEComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComEComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
