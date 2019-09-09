import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveMeComponent } from './remove-me.component';

describe('RemoveMeComponent', () => {
  let component: RemoveMeComponent;
  let fixture: ComponentFixture<RemoveMeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoveMeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveMeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
