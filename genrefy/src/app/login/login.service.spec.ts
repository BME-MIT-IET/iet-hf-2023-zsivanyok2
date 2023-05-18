import { TestBed } from '@angular/core/testing';

import { LoginService } from './login.service';

describe('LoginService', () => {
  let service: LoginService;
  let fetchSpy: jasmine.Spy;

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

  it('#getAccessToken should fetch access token', async () => {
    const clientId = 'testClientId';
    const code = 'testCode';
    const mockAccessToken = 'testAccessToken';
    const mockResponse = new Response(JSON.stringify({ access_token: mockAccessToken }));
    const mockVerifier = 'testVerifier';
  
    spyOn(window, 'fetch').and.returnValue(Promise.resolve(mockResponse));
    spyOn(localStorage, 'getItem').and.returnValue(mockVerifier);
  
    const accessToken = await service.getAccessToken(clientId, code);
    
    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", "http://localhost:4200/login");
    params.append("code_verifier", mockVerifier);
  
    expect(window.fetch).toHaveBeenCalledWith('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params,
    });
    expect(accessToken).toEqual(mockAccessToken);
  });

});
