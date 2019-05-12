import UserModel from '../models/user.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { USERS } from './url.service';
import ServerService from './server.service';
import ResponseModel from '../models/response.model';
import ModelUtil from '../utils/model.util';

@Injectable()
export default class UserService extends ServerService {

  constructor(private httpClient: HttpClient) { super(); }

  private user:UserModel;

  addUser(user: UserModel) {
    this.httpClient.post(USERS, user)
      .subscribe(
        (data: ResponseModel) => {
          this.emitPostSuccess(data);
        },
        (err) => { this.emitPostError(err)  },
        () => { }
      );
  }

  logUser(user: UserModel) {
    this.httpClient.post(USERS + '/login', user)
      .subscribe(
        (data: UserModel[]) => {
          this.user = data[0];
          this.emitPostResponseSuccess(data[0]);
        },
        (err) => { this.emitPostResponseError(err)  },
        () => { }
      );
  }

  searchUser() {
    this.httpClient.get(USERS)
      .subscribe(
        (data: UserModel[]) => {
          this.emitGetSuccess(data);
        },
        (err) => { this.emitPostError(err)  },
        () => { }
      );
  }

  findUser(model: UserModel) {
    let params = ModelUtil.getParams(model);
    this.httpClient.get(USERS, { params })
      .subscribe(
        (data: UserModel[]) => {
          this.emitGetSuccess(data);
        },
        (err) => { this.emitPostError(err)  },
        () => { }
      );
  }

  getUser() {
    return this.user;
  }

  logOut() {
    this.user = undefined;
  }

  isAuthentified() {
    return this.user !== undefined;
  }

  isUserBackOffice() {
    return this.isAuthentified() && this.user.userType === 1;
  }
}
