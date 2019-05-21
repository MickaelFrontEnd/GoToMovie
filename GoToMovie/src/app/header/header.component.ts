import { Component, OnInit } from '@angular/core';
import UserService from '../services/user.service';
import { Router } from '@angular/router';
import { USERS_IMAGES_FOLDER } from '../services/url.service';
import UserModel from '../models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user: UserModel;
  userImageFolder: string;

  constructor(private userService: UserService,
              private router: Router) { }

  ngOnInit() {
    this.userImageFolder = USERS_IMAGES_FOLDER;
    this.user = this.userService.getUser();
  }

  logOut() {
    this.userService.logOut();
    this.router.navigate(['/login']);
  }

}
