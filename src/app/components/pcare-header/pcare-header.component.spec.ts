import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PcareHeaderComponent } from './pcare-header.component';

describe('PcareHeaderComponent', () => {
  let component: PcareHeaderComponent;
  let fixture: ComponentFixture<PcareHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PcareHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PcareHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
