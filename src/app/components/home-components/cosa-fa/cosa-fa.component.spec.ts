import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CosaFaComponent } from './cosa-fa.component';

describe('CosaFaComponent', () => {
  let component: CosaFaComponent;
  let fixture: ComponentFixture<CosaFaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CosaFaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CosaFaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
