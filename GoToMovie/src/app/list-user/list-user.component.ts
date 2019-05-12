import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import UserModel from '../models/user.model';
import UserService from '../services/user.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {

  listUsers: UserModel[];
  isLoading: boolean = true;
  userForm: FormGroup;

  constructor(private userService: UserService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.subscribe();
    this.initList();
    this.initForm();
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
    this.userService.getSubject.subscribe(
      (data: UserModel[]) => {
        this.isLoading = false;
        this.listUsers = data;
      }
    );
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
