import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import UserService from '../services/user.service';
import UserModel from '../models/user.model';
import ResponseModel from '../models/response.model';
import { SUCCESS } from '../models/status.model';
import { Subscription } from 'rxjs/subscription';

@Component({
  selector: 'app-form-password',
  templateUrl: './form-password.component.html',
  styleUrls: ['./form-password.component.css']
})
export class FormPasswordComponent implements OnInit, OnDestroy {

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
