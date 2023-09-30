import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileByUsernameComponent } from './profile-by-username.component';

describe('ProfileByUsernameComponent', () => {
  let component: ProfileByUsernameComponent;
  let fixture: ComponentFixture<ProfileByUsernameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileByUsernameComponent]
    });
    fixture = TestBed.createComponent(ProfileByUsernameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
