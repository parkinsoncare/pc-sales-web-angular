import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Auth0RolesComponent } from './auth0-roles.component';

describe('Auth0RolesComponent', () => {
  let component: Auth0RolesComponent;
  let fixture: ComponentFixture<Auth0RolesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Auth0RolesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Auth0RolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
