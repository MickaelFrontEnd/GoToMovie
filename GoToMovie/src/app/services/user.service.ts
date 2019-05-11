import UserModel from '../models/user.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { USERS } from './url.service';
import ServerService from './server.service';
import ResponseModel from '../models/response.model';

@Injectable()
export default class UserService extends ServerService {

  constructor(private httpClient: HttpClient) { super(); }

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
}
