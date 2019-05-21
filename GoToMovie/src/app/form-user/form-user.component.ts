import { Component, OnInit } from '@angular/core';
import UserService from '../services/user.service';
import UserModel from '../models/user.model';
import { USERS_IMAGES_FOLDER } from '../services/url.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.css']
})
export class FormUserComponent implements OnInit {

  user: UserModel;
  userImageFolder: string;

  constructor(private userService: UserService,
              private router: Router) { }

  ngOnInit() {
    this.userImageFolder = USERS_IMAGES_FOLDER;
    this.user = this.userService.getUser();
  }

  formatDob(dob: string) {
    let s = dob.split('-');
    return s[2] + '-' + s[1] + '-' + s[0];
  }

  logOut() {
    this.userService.logOut();
    this.router.navigate(['/login']);
  }

}
