import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import UserService from '../services/user.service';
import UserModel from '../models/user.model';
import ResponseModel from '../models/response.model';
import { SUCCESS } from '../models/status.model';

@Component({
  selector: 'app-form-register',
  templateUrl: './form-register.component.html',
  styleUrls: ['./form-register.component.css']
})
export class FormRegisterComponent implements OnInit {

  registerForm: FormGroup;
  disableBtn: boolean = false;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private router:Router) { }

  ngOnInit() {
    this.initForm();
    this.subscribeToService();
  }

  subscribeToService() {
    this.userService.postSubject.subscribe(
      (data) => { this.onPostSuccess (data); },
      (err) => { this.onPostError (err); }
    );
  }

  initForm() {
    this.registerForm = this.formBuilder.group({
      userName: ['', Validators.required],
      userFirstName: ['', Validators.required],
      userEmail: ['', [Validators.required, Validators.email]],
      userDob: ['', Validators.required],
      userPassword: ['', Validators.required],
      userValidationPassword: ['', Validators.required],
      userTC: ['', Validators.required],
      userProfilePic: '',
    });
  }

  onSubmitForm() {
    if(this.registerForm.valid) {
      const formValue = this.registerForm.value;
      const newUser = new UserModel(
        null,
        formValue['userName'],
        formValue['userFirstName'],
        formValue['userDob'],
        formValue['userEmail'],
        formValue['userPassword'],
        formValue['userProfilePic'],
        0
      );
      this.disableBtn = true;
      this.userService.addUser(newUser);
    }
    else {
      Object.keys(this.registerForm.controls).forEach(field => {
        const control = this.registerForm.get(field);
        control.markAsDirty({ onlySelf: true });
      });
    }
  }

  onPostSuccess(data: ResponseModel) {
    if(data.status === SUCCESS) {
      this.router.navigate(['/cinema/list']);
    }
  }

  onPostError(err) {
    this.disableBtn = false;
    alert(err);
  }

}
