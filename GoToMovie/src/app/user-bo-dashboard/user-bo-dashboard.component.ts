import { Component, OnInit, OnDestroy } from '@angular/core';
import DashboardModel from '../models/dashboard.model';
import UserModel from '../models/user.model';
import UserService from '../services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-bo-dashboard',
  templateUrl: './user-bo-dashboard.component.html',
  styleUrls: ['./user-bo-dashboard.component.css']
})
export class UserBoDashboardComponent implements OnInit, OnDestroy {

  dashboard: DashboardModel;
  subscription: Subscription;
  user: UserModel;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.subscribe();
    this.initList();
  }

  ngOnDestroy() {
    this.unsubscribe();
  }

  subscribe() {
    this.subscription = this.userService.getSubject.subscribe(
      (data: DashboardModel) => {
        this.dashboard = data;
      }
    );
  }

  unsubscribe() {
    this.subscription.unsubscribe();
  }

  initList() {
    this.user = this.userService.getUser();
    this.userService.getUserDashboard(this.user);
  }

}
