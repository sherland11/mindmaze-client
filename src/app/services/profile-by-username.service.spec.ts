import { TestBed } from '@angular/core/testing';

import { ProfileByUsernameService } from './profile-by-username.service';

describe('ProfileByUsernameService', () => {
  let service: ProfileByUsernameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfileByUsernameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
