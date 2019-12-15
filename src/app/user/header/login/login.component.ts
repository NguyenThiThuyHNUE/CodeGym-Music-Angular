import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../../../service/user.service';
import {MatDialogRef} from '@angular/material';
import {SnotifyService} from 'ng-snotify';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });

  constructor(
    private fb: FormBuilder,
    private Notify: SnotifyService,
    private router: Router,
    private userService: UserService,
    private dialogRef: MatDialogRef<LoginComponent>
  ) {
  }

  ngOnInit() {
  }

  userLogin() {
    this.Notify.info('Wait...', {timeout: 1000});
    this.userService.userLogin(this.loginForm.value)
      .subscribe(
        data => {
          this.handleResponse(data);
        },
        error => {
          this.handleError(error);
        });
  }

  get password() {
    return this.loginForm.get('password');
  }

  get email() {
    return this.loginForm.get('email');
  }

  resetForm() {
    this.dialogRef.close();
  }

  handleError(error) {
    // tslint:disable-next-line:triple-equals
    if (error.name == 'HttpErrorResponse') {
      console.log(error);
      return this.Notify.error('Disconnect to Server, Please contact to Mrs.Thuy to fix the problem', 'Login Error',
        {timeout: 10000});
    }
    console.log(error);
    return this.Notify.error('Please check your account or password', 'Login Error');
  }

  handleResponse(data) {
    localStorage.setItem('token', data.access_token);
    this.resetForm();
    this.Notify.success('Login Success', 'Welcome');
  }
}
