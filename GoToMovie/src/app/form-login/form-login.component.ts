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
  showError: boolean = false;
  disableBtn: boolean = false;

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
      this.disableBtn = true;
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
    this.disableBtn = false;
    if(data) {
      this.user = data;
      if(this.user.userType === 1) {
        this.router.navigate(['/users/dashboard']);
      }
      else {
        this.router.navigate(['/projections/list']);
      }
    }
    else {
      this.showError = true;
    }
  }

  onPostError(err) {
    this.disableBtn = false;
    alert('Une erreur s\'est produite. Veuillez contacter l\'administrateur.');
  }

}
