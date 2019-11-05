import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PcareIntroComponent } from './pcare-intro.component';

describe('PcareIntroComponent', () => {
  let component: PcareIntroComponent;
  let fixture: ComponentFixture<PcareIntroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PcareIntroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PcareIntroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
