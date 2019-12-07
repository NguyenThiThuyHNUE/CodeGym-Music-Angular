import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../service/user.service';
import {first} from 'rxjs/operators';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  private errorFromBackEnd = '';
  loginForm = this.fb.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private dialogRef: MatDialogRef<LoginComponent>
  ) { }

  ngOnInit() {
  }
  userLogin() {
    this.userService.userLogin(this.loginForm.value)
      .subscribe(
        data => {
          console.log(this.loginForm.value);
          localStorage.setItem('token', data.access_token);
          this.router.navigate(['/']);
          this.resetForm();
        },
        error => {
          this.errorFromBackEnd = error;
          return this.router.navigate(['/login']);
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
}
