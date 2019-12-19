import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../service/user.service';
import {first} from 'rxjs/operators';
import {MatDialogRef} from '@angular/material';
import {SnotifyService} from "ng-snotify";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  buttonStatus = true;
  loginForm = this.fb.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private Notify: SnotifyService,
    private userService: UserService,
    private dialogRef: MatDialogRef<LoginComponent>
  ) {
  }

  ngOnInit() {
  }

  userLogin() {
    this.buttonStatus = false;
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

  handleResponse(res) {

    localStorage.setItem('token', res.access_token);
    this.buttonStatus = true;
    this.Notify.success(`Login Success, Welcome ${res.name}`, 'Congratulations', {timeout: 7000});
    this.resetForm();
  }

  handleError(error) {
    this.buttonStatus = true;
    // tslint:disable-next-line:triple-equals
    if (error.status == 0) {
      return this.Notify.error('Disconnect to Server, Please try again later', 'Register Error',
        {timeout: 10000});
    }
    if (error.error.errors.email) {
      return this.Notify.error(error.error.errors.email[0], 'Login Error',
        {timeout: 10000});
    }
    return this.Notify.error('Please check your account or password', 'Login Error', {timeout: 7000});
  }

}
