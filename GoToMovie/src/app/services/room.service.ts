import RoomModel from '../models/room.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ROOMS } from './url.service';
import ServerService from './server.service';
import ResponseModel from '../models/response.model';
import ModelUtil from '../utils/model.util';

@Injectable()
export default class RoomService extends ServerService {

  constructor(private httpClient: HttpClient) { super(); }

  addRoom(room: RoomModel) {
    this.httpClient.post(ROOMS, room)
      .subscribe(
        (data: ResponseModel) => {
          this.emitPostSuccess(data);
        },
        (err) => { this.emitPostError(err)  },
        () => { }
      );
  }

  getRoom() {
    this.httpClient.get(ROOMS)
      .subscribe(
        (data: RoomModel[]) => {
          this.emitGetSuccess(data);
        },
        (err) => { this.emitPostError(err)  },
        () => { }
      );
  }

  findRoom(model: RoomModel) {
    let params = ModelUtil.getParams(model);
    this.httpClient.get(ROOMS, { params })
      .subscribe(
        (data: RoomModel[]) => {
          this.emitGetSuccess(data);
        },
        (err) => { this.emitPostError(err)  },
        () => { }
      );
  }
}
