import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import UserService from '../services/user.service';
import UserModel from '../models/user.model';
import ResponseModel from '../models/response.model';
import { SUCCESS } from '../models/status.model';
import { Subscription } from 'rxjs/subscription';

@Component({
  selector: 'app-form-admin',
  templateUrl: './form-admin.component.html',
  styleUrls: ['./form-admin.component.css']
})
export class FormAdminComponent implements OnInit {

  passwordForm: FormGroup;
  user: UserModel;
  showMessage: boolean = false;
  disableBtn: boolean = false;
  userSubscription: Subscription;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,) { }

  ngOnInit() {
    this.subscribeToService();
    this.initForm();
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  initForm() {
    this.passwordForm = this.formBuilder.group({
      userEmail: ['', [Validators.required, Validators.email]]
    });
  }

  subscribeToService() {
    this.userSubscription = this.userService.postSubject.subscribe(
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
      this.userService.sendAdminPassword(newUser);
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

  onComplete() {
    this.disableBtn = false;
  }
}
