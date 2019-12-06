import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../../../service/user.service';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(private fb: FormBuilder,
              private router: Router,
              private userService: UserService,
              private dialogRef: MatDialogRef<RegisterComponent>
  ) {
  }

  ngOnInit() {
  }

  register() {
    this.userService.userRegister(this.registerForm.value).subscribe(
      res => {
        console.log(res);
        localStorage.setItem('user', res.data.name);
        this.resetForm();
      },
      error => console.log(error)
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
}
