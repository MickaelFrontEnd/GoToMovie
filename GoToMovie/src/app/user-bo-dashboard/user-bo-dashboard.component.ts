import { Component, OnInit } from '@angular/core';
import DashboardModel from '../models/dashboard.model';
import UserService from '../services/user.service';

@Component({
  selector: 'app-user-bo-dashboard',
  templateUrl: './user-bo-dashboard.component.html',
  styleUrls: ['./user-bo-dashboard.component.css']
})
export class UserBoDashboardComponent implements OnInit {

  dashboard: DashboardModel;

  constructor(private userService: UserService,) { }

  ngOnInit() {
    this.subscribe();
    this.initList();
  }

  subscribe() {
    this.userService.getSubject.subscribe(
      (data: DashboardModel) => {
        this.dashboard = data;
      }
    );
  }

  initList() {
    this.userService.getUserBoDashboard();
  }

}
