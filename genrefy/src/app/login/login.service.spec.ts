import { TestBed } from '@angular/core/testing';

import { LoginService } from './login.service';

describe('LoginService', () => {
  let service: LoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch profile with correct token', async () => {
    const mockResponse = { name: 'test' };
    const mockToken = 'mock-token';
    const fetchResponse = new Response(JSON.stringify(mockResponse));

    spyOn(window, 'fetch').and.returnValue(Promise.resolve(fetchResponse));

    const profile = await service.fetchProfile(mockToken);

    expect(window.fetch).toHaveBeenCalledWith('https://api.spotify.com/v1/me', {
      method: 'GET',
      headers: { Authorization: `Bearer ${mockToken}` },
    });
    expect(profile).toEqual(mockResponse);
  });
});
