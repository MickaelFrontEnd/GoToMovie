import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import UserService from '../services/user.service';
import UserModel from '../models/user.model';
import ResponseModel from '../models/response.model';
import { SUCCESS } from '../models/status.model';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.css']
})
export class FormLoginComponent implements OnInit {

  loginForm: FormGroup;
  user: UserModel;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private router:Router) { }

  ngOnInit() {
    this.subscribeToService();
    this.initForm();
  }

  initForm() {
    this.loginForm = this.formBuilder.group({
      userEmail: ['', Validators.required],
      userPassword: ['', Validators.required],
    });
  }

  subscribeToService() {
    this.userService.postResponseSubject.subscribe(
      (data) => { this.onPostSuccess (data); },
      (err) => { this.onPostError (err); }
    );
  }

  onSubmitForm() {
    if(this.loginForm.valid) {
      const formValue = this.loginForm.value;
      const newUser = new UserModel(
        '',
        '',
        '',
        '',
        formValue['userEmail'],
        formValue['userPassword'],
        '',
        0
      );
      this.userService.logUser(newUser);
    }
    else {
      Object.keys(this.loginForm.controls).forEach(field => {
        const control = this.loginForm.get(field);
        control.markAsDirty({ onlySelf: true });
      });
    }
  }

  onPostSuccess(data: UserModel) {
    if(data) {
      this.user = data;
      this.router.navigate(['/movies/list']);
    }
  }

  onPostError(err) {
    alert(err);
  }

}
