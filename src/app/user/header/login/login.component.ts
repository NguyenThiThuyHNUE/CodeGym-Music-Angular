import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../../../service/user.service';
import {MatDialogRef} from '@angular/material';
import {SnotifyService} from 'ng-snotify';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {AuthService, SocialUser, FacebookLoginProvider} from 'angularx-social-login';
import {SharedService} from '../../../service/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  buttonStatus = true;
  title = 'app';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private shareService: SharedService,
    public dialog: MatDialog,
    private Notify: SnotifyService,
    private userService: UserService,
    private dialogRef: MatDialogRef<LoginComponent>,
    private socialAuthService: AuthService
  ) {
  }

  public user: any = SocialUser;

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

  ngOnInit() {
  }

  facebooklogin() {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).then((userData) => {
      this.user = userData;
      this.resetLoginForm();
      this.userService.userLoginFacebook(userData).subscribe((data) => {
        localStorage.setItem('token', data.access_token);
        this.shareService.isLoginChange(true);
      });
    });
  }


  register() {
    this.buttonStatus = false;
    this.Notify.info('Wait...', {timeout: 1000});
    this.userService.userRegister(this.registerForm.value).subscribe(
      res => this.handleRegisterResponse(res),
      error => this.handleRegisterError(error)
    );
  }

  userLogin() {
    this.buttonStatus = false;
    this.Notify.info('Wait...', {timeout: 1000});
    this.userService.userLogin(this.loginForm.value)
      .subscribe(
        res => this.handleLoginResponse(res),
        error => this.handleLoginError(error)
      );
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

  resetLoginForm() {
    this.dialogRef.close();
  }

  resetRegisterForm() {
    this.dialogRef.close();
    this.registerForm = this.fb.group({
      name: [''],
      email: [''],
      password: [''],
      confirmPassword: [''],
    });
  }

  handleLoginResponse(res) {
    this.userService.saveToken(res);
    this.buttonStatus = true;
    this.shareService.isLoginChange(true);
    this.resetLoginForm();
  }

  handleLoginError(error) {
    this.buttonStatus = true;
    // tslint:disable-next-line:triple-equals
    if (error.status == 0) {
      return this.Notify.error('Disconnect to Server, Please try again later', 'Register Error',
        {timeout: 5000});
    }
    if (error.error.errors.email) {
      return this.Notify.error(error.error.errors.email, 'Login Error',
        {timeout: 5000});
    }
    if (error.error.errors.password) {
      return this.Notify.error(error.error.errors.password, 'Login Error',
        {timeout: 5000});
    }
    return this.Notify.error('Please check your account or password', 'Login Error', {timeout: 5000});
  }

  handleRegisterError(error) {
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

  handleRegisterResponse(res) {
    this.buttonStatus = true;
    this.Notify.success(`Register Success, Please Login ${res.data.name}`, 'Congratulations', {timeout: 1000});
    this.resetRegisterForm();
    this.showFormLogin();
  }

  showFormLogin() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '40%';
    this.dialog.open(LoginComponent, dialogConfig);
  }
}
