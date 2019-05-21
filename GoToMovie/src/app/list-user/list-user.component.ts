import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import UserModel from '../models/user.model';
import UserService from '../services/user.service';
import { Subscription } from 'rxjs';
import { USERS_IMAGES_FOLDER } from '../services/url.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit, OnDestroy {

  listUsers: UserModel[];
  isLoading: boolean = true;
  userForm: FormGroup;
  userImageFolder: string;
  subscription: Subscription;

  constructor(private userService: UserService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.userImageFolder = USERS_IMAGES_FOLDER;
    this.subscribe();
    this.initList();
    this.initForm();
  }

  ngOnDestroy(): void {
    this.unsubsribe();
  }

  initForm() {
    this.userForm = this.formBuilder.group({
      userName: '',
      userFirstName: '',
      userType: '',
      userEmail: ''
    });
  }

  subscribe() {
    this.subscription = this.userService.getSubject.subscribe(
      (data: UserModel[]) => {
        this.isLoading = false;
        this.listUsers = data;
      }
    );
  }

  unsubsribe() {
    this.subscription.unsubscribe();
  }

  onSubmitForm() {
    const formValue = this.userForm.value;
    const newUser = new UserModel(
      '',
      formValue['userName'],
      formValue['userFirstName'],
      '',
      formValue['userEmail'],
      '',
      '',
      formValue['userType']
    );
    this.isLoading = true;
    this.listUsers = [];
    this.userService.findUser(newUser);
  }

  initList() {
    this.userService.searchUser();
  }

  formatDob(dob: string) {
    let s = dob.split('-');
    return s[2] + '-' + s[1] + '-' + s[0];
  }

}
