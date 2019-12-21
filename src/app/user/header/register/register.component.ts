import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../../../service/user.service';
import {MatDialogRef} from '@angular/material/dialog';
import {SnotifyService} from 'ng-snotify';

const REGISTER = 0;
const LOGIN = 1;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  buttonStatus = true;
  selectTab = REGISTER;
  registerForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required]],
  });

  loginForm = this.fb.group({
    emailLogin: ['', [Validators.required]],
    passwordLogin: ['', [Validators.required]]
  });

  constructor(private fb: FormBuilder,
              private router: Router,
              private userService: UserService,
              private Notify: SnotifyService,
              private dialogRef: MatDialogRef<RegisterComponent>
  ) {
  }

  ngOnInit() {
  }

  register() {
    this.buttonStatus = false;
    this.Notify.info('Wait...', {timeout: 1000});
    this.userService.userRegister(this.registerForm.value).subscribe(
      res => this.handleResponse(res),
      error => this.handleError(error)
    );
  }

  userLogin() {
    this.buttonStatus = false;
    this.Notify.info('Wait...', {timeout: 1000});
    this.userService.userLogin(this.loginForm.value)
      .subscribe();
  }

  get name() {
    return this.registerForm.get('name');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get passwordLogin() {
    return this.loginForm.get('passwordLogin');
  }

  get emailLogin() {
    return this.loginForm.get('emailLogin');
  }

  resetForm() {
    this.registerForm = this.fb.group({
      name: [''],
      email: [''],
      password: [''],
      confirmPassword: [''],
    });
  }

  handleError(error) {
    this.buttonStatus = true;
    // tslint:disable-next-line:triple-equals
    if (error.status == 0) {
      return this.Notify.error('Disconnect to Server, Please try again later', 'Register Error',
        {timeout: 10000});
    }
    if (error.error.errors.email) {
      return this.Notify.error(error.error.errors.email[0], 'Register Error',
        {timeout: 10000});
    }
    return this.Notify.error('Please check your account or password', 'Register Error', {timeout: 7000});
  }

  handleResponse(res) {
    this.buttonStatus = true;
    this.selectTab = LOGIN;
    this.Notify.success(`Register Success, Please Login ${res.data.name}`, 'Congratulations', {timeout: 7000});
    this.resetForm();
  }

}
