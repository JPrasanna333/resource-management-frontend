import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from '../services/login/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  username: any;
  constructor(
    private _formBuilder: FormBuilder,
    private _registerService: RegisterService,
    private _router: Router
  ) {}
  registerForm: FormGroup = this._formBuilder.group({
    userName: ['', { validators: [Validators.required],updateOn: "change" }],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    password: ['', Validators.required],
  });

  ngOnInit(): void {}

  // onRegister = (registerForm: NgForm) => {
  //   // console.log(registerForm.value.userName);
  //   this._registerService.register(registerForm.value).subscribe(
  //     (response) => {
  //       this.username = registerForm.value.userName;
  //       alert(this.username + 'Successfully Registered');
  //       this._router.navigate(['/login']);
  //     },
  //     (error) => {
  //       const msg = error.error.message;
  //       alert(msg);
  //     }
  //   );
  // };

  onRegister() {
    console.log(this.registerForm.value);
  }
}
