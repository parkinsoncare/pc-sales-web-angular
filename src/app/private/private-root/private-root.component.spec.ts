import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateRootComponent } from './private-root.component';

describe('PrivateRootComponent', () => {
  let component: PrivateRootComponent;
  let fixture: ComponentFixture<PrivateRootComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrivateRootComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
