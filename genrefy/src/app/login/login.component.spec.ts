import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';

import { LoginComponent } from './login.component';
import { LoginService } from './login.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  const mockActivatedRoute = {
    queryParams: of({ code: 'mockCode' })
  };
  
  const mockRouter = {
    navigate: jasmine.createSpy('navigate') // Spy on the navigate method.
  };
  
  const mockLoginService = {
    redirectToAuthCodeFlow: jasmine.createSpy('redirectToAuthCodeFlow'), // Spy on redirectToAuthCodeFlow method.
    getAccessToken: jasmine.createSpy('getAccessToken').and.returnValue(Promise.resolve('mockAccessToken')), // Spy on getAccessToken method.
    fetchProfile: jasmine.createSpy('fetchProfile').and.returnValue(Promise.resolve({ id: 'mockUserId' })) // Spy on fetchProfile method.
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Router, useValue: mockRouter },
        { provide: LoginService, useValue: mockLoginService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a clientId', () => {
    expect(component.clientId).toBeTruthy();
    expect(typeof component.clientId).toEqual('string');
    expect(component.clientId.length).toBeGreaterThan(0);
  });

  it('should redirect to auth code flow if no code', () => {
    component.code = null;
    component.ngOnInit();
    expect(mockLoginService.redirectToAuthCodeFlow).toHaveBeenCalled();
  });

  it('should get access token if code', async () => {
    component.code = 'mockCode';
    await component.ngOnInit();
    expect(mockLoginService.getAccessToken).toHaveBeenCalled();
  });

  it('should save access token to local storage if code', async () => {
    component.code = 'mockCode';
    await component.ngOnInit();
    expect(localStorage.getItem('access_token')).toEqual('mockAccessToken');
  });

  it('should fetch profile if code', async () => {
    component.code = 'mockCode';
    await component.ngOnInit();
    expect(mockLoginService.fetchProfile).toHaveBeenCalled();
  });

  it('should save user id to local storage if code', async () => {
    component.code = 'mockCode';
    await component.ngOnInit();
    expect(localStorage.getItem('user_id')).toEqual('mockUserId');
  });

  it('should navigate to songs page if code', async () => {
    component.code = 'mockCode';
    await component.ngOnInit();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/songs']);
  });

});
