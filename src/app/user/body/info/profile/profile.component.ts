import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  updateForm = this.fb.group({
    emailUpdate: ['', [Validators.required]],
    passwordUpdate: ['', [Validators.required]]
  });

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
  }

  userUpdate() {

  }

  get passwordUpdate() {
    return this.updateForm.get('passwordUpdate');
  }

  get emailUpdate() {
    return this.updateForm.get('emailUpdate');
  }


}
