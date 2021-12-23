import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginAuthService } from '../services/login/login-auth.service';
import { LoginService } from '../services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  error: boolean = false;
  token: any;
  role: string = '';
  constructor(
    private _loginService: LoginService,
    private _authService: LoginAuthService,
    private _router: Router
  ) {}

  ngOnInit(): void {}

  login = (loginForm: NgForm) => {
    this._loginService.login(loginForm.value).subscribe(
      (response: any) => {
        console.log(response);
        // this._authService.setRoles(response.user.role);
        //this._authService.setToken(response.jwtToken);
        // this._authService.getRoles();
        this.token = response.jwtToken;
        localStorage.setItem('token', this.token);

        this.role = response.user.role[0].roleName;
        this._loginService.onChangeRole(this.role);
        
        if (localStorage.getItem('token') != null) {
          console.log(localStorage.getItem('token'));
          this._router.navigate(['/content']);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  };
}
