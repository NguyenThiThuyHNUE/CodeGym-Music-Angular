import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../../../service/user.service';
import {MatDialogRef} from '@angular/material/dialog';
import {SnotifyService} from 'ng-snotify';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  buttonStatus = true;
  registerForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(private fb: FormBuilder,
              private router: Router,
              private userService: UserService,
              private dialogRef: MatDialogRef<RegisterComponent>,
              private Notify: SnotifyService,
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

  get name() {
    return this.registerForm.get('name');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get email() {
    return this.registerForm.get('email');
  }

  resetForm() {
    this.dialogRef.close();
  }

  handleError(error) {
    if (error.error.errors.email) {
      this.buttonStatus = true;
      return this.Notify.error(error.error.errors.email[0], 'Register Error',
        {timeout: 10000});
    }
    // tslint:disable-next-line:triple-equals
    if (error.name == 'HttpErrorResponse') {
      this.buttonStatus = true;
      return this.Notify.error('Disconnect to Server, Please try again later', 'Register Error',
        {timeout: 10000});
    }
    console.log(error);
    this.buttonStatus = true;
    return this.Notify.error('Please check your account or password', 'Register Error', {timeout: 7000});
  }

  handleResponse(res) {
    this.buttonStatus = true;
    this.Notify.success(`Register Success, Welcome ${res.data.name}`, 'Congratulations', {timeout: 7000});
    this.resetForm();
  }

}
