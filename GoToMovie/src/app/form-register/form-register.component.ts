import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import UserService from '../services/user.service';
import UserModel from '../models/user.model';
import ResponseModel from '../models/response.model';
import { SUCCESS, ERROR } from '../models/status.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-form-register',
  templateUrl: './form-register.component.html',
  styleUrls: ['./form-register.component.css']
})
export class FormRegisterComponent implements OnInit, OnDestroy {

  registerForm: FormGroup;
  disableBtn: boolean = false;
  subscription: Subscription;
  passwordSubscription: Subscription;
  passwordValidationSubscription: Subscription;
  private userPic: File;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private router:Router) { }

  ngOnInit() {
    this.initForm();
    this.subscribeToService();
  }

  ngOnDestroy() {
    this.unsubscribe();
  }

  subscribeToService() {
    this.subscription = this.userService.postSubject.subscribe(
      (data) => { this.onPostSuccess (data); },
      (err) => { this.onPostError (err); },
      () => { this.onComplete(); }
    );

    this.passwordSubscription = this.registerForm.get('userPassword').valueChanges.subscribe(
      (uname) => {
    	   this.registerForm.get('userValidationPassword').updateValueAndValidity({onlySelf: true, emitEvent: false});
       }
    );

    this.passwordValidationSubscription = this.registerForm.get('userValidationPassword').valueChanges.subscribe(
      (uname) => {
    	   this.registerForm.get('userPassword').updateValueAndValidity({onlySelf: true, emitEvent: false});
       }
    );
  }

  unsubscribe() {
    this.subscription.unsubscribe();
    this.passwordSubscription.unsubscribe();
    this.passwordValidationSubscription.unsubscribe();
  }

  initForm() {
    this.registerForm = this.formBuilder.group({
      userName: ['', Validators.required],
      userFirstName: ['', Validators.required],
      userEmail: ['', [Validators.required, Validators.email]],
      userDob: ['', Validators.required],
      userPassword: ['', [Validators.required, Validators.pattern('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\\s).{8,15}$'), this.validatePassword]],
      userValidationPassword: ['', [Validators.required, this.validatePassword]],
      userTC: ['', Validators.required],
      userProfilePic: '',
    });
  }

  onSubmitForm() {
    if(this.registerForm.valid) {
      const formValue = this.registerForm.value;
      this.disableBtn = true;
      this.userService.addUser(this.buildFormData(formValue));
    }
    else {
      Object.keys(this.registerForm.controls).forEach(field => {
        const control = this.registerForm.get(field);
        control.markAsDirty({ onlySelf: true });
      });
    }
  }

  onPostSuccess(data: ResponseModel) {
    this.disableBtn = false;
    if(data.status === SUCCESS) {
      this.router.navigate(['/users/dashboard']);
    }
    else {
      alert(data.message);
    }
  }

  onPostError(err) {
    this.disableBtn = false;
    alert('Une erreur s\'est produite, veuillez contacter l\'administrateur');
  }

  onComplete() {
    this.disableBtn = false;
  }

  validatePassword = (control: AbstractControl): ValidationErrors | null => {
    if(this.registerForm) {
      let org = this.registerForm.get('userPassword').value;
      let dest = this.registerForm.get('userValidationPassword').value;
      return dest === org ? null : { 'invalidPassword': 'Les mots de passe ne correspondent pas' };
    }
    return null;
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      this.userPic = event.target.files[0];
    }
  }

  buildFormData(formValue): FormData {
    let data:FormData = new FormData();
    data.append('userName', formValue['userName']);
    data.append('userFirstName', formValue['userFirstName']);
    data.append('userDob', formValue['userDob']);
    data.append('userEmail', formValue['userEmail']);
    data.append('userPassword', formValue['userPassword']);
    data.append('userType', '0');
    data.append('userProfilePic', this.userPic);
    return data;
  }

}
