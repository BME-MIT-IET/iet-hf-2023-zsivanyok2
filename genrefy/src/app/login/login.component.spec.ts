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
  
});
