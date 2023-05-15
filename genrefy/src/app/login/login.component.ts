import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  clientId = '539eb3dde4a34d43af426943326af465'; // Replace with your client id
  params = new URLSearchParams(window.location.search);
  code = this.params.get("code");
  profile: any;

  constructor(private route: ActivatedRoute, private router: Router, private loginService: LoginService) {
    this.route.queryParams.subscribe((params) => {
      this.code = params['code'];
    });
  }
  /**
 * Lifecycle hook that is called after data-bound properties of a directive are initialized.
 *
 * This method is used for the login process. It checks whether a code is present.
 * If not, it redirects to get the auth code. If the code is present, it gets the access token,
 * saves it in local storage, fetches the user profile, and navigates to the songs page.
 */
  async ngOnInit() {
    console.log('LoginComponent.ngOnInit() called');
    if (!this.code) {
      //wait 5 seconds
      console.log('No code found, redirecting to auth code flow');
      await this.loginService.redirectToAuthCodeFlow(this.clientId);
    } else {
      console.log('Code found, getting access token');
      const accessToken = await this.loginService.getAccessToken(this.clientId, this.code);
      localStorage.setItem('access_token', accessToken);
      console.log(accessToken)
      console.log('Access token saved to local storage');
      const profile = await this.loginService.fetchProfile(accessToken);
      localStorage.setItem('user_id', profile.id);
      console.log('Profile fetched');
      this.router.navigate(['/songs']);
    }
  }
}
