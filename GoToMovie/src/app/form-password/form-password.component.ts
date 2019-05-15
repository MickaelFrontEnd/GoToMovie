import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import UserService from '../services/user.service';
import UserModel from '../models/user.model';
import ResponseModel from '../models/response.model';
import { SUCCESS } from '../models/status.model';

@Component({
  selector: 'app-form-password',
  templateUrl: './form-password.component.html',
  styleUrls: ['./form-password.component.css']
})
export class FormPasswordComponent implements OnInit {

  passwordForm: FormGroup;
  user: UserModel;
  showMessage: boolean = false;
  disableBtn: boolean = false;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,) { }

  ngOnInit() {
    this.subscribeToService();
    this.initForm();
  }

  initForm() {
    this.passwordForm = this.formBuilder.group({
      userEmail: ['', [Validators.required, Validators.email]]
    });
  }

  subscribeToService() {
    this.userService.postSubject.subscribe(
      (data) => { this.onPostSuccess (data); },
      (err) => { this.onPostError (err); },
      () => { this.onComplete(); }
    );
  }

  onSubmitForm() {
    if(this.passwordForm.valid) {
      const formValue = this.passwordForm.value;
      const newUser = new UserModel(
        '',
        '',
        '',
        '',
        formValue['userEmail'],
        '',
        '',
        0
      );
      this.disableBtn = true;
      this.userService.resetPassword(newUser);
    }
    else {
      Object.keys(this.passwordForm.controls).forEach(field => {
        const control = this.passwordForm.get(field);
        control.markAsDirty({ onlySelf: true });
      });
    }
  }

  onPostSuccess(data: ResponseModel) {
    this.disableBtn = false;
    if(data.status === SUCCESS) {
      this.showMessage = true;
    }
    else {
      alert(data.message);
    }
  }

  onPostError(err) {
    this.disableBtn = false;
    alert(err);
  }

  onComplete() { alert('on complete');
    this.disableBtn = false;
  }

}
