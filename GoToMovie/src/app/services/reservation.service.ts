import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RESERVATIONS } from './url.service';
import ServerService from './server.service';
import ResponseModel from '../models/response.model';
import ReservationModel from '../models/reservation.model';
import UserModel from '../models/user.model';
import ModelUtil from '../utils/model.util';

@Injectable()
export default class ProjectionService extends ServerService {

  constructor(private httpClient: HttpClient) { super(); }

  addReservation(reservation: ReservationModel) {
    this.httpClient.post(RESERVATIONS, reservation)
    .subscribe(
      (data: ResponseModel) => {
        this.emitPostSuccess(data);
      },
      (err) => { this.emitPostError(err)  },
      () => { }
    );
  }

  getReservation(user: UserModel) {
    let params = null;
    if(user) {
      let m = {
        userId: user._id
      }
      params = ModelUtil.getParams(m);
    }
    this.httpClient.get(RESERVATIONS, { params })
      .subscribe(
        (data: ReservationModel[]) => {
          this.emitGetSuccess(data);
        },
        (err) => { this.emitPostError(err)  },
        () => { }
      );
  }

  findReservation(model: ReservationModel) {
    let m = {
      movieTitle: model.reservationProjection.projectionMovie.movieTitle,
      userName: model.reservationUser? model.reservationUser.userName : '',
      userFirstName: model.reservationUser? model.reservationUser.userFirstName : '',
      projectionRoom: model.reservationProjection.projectionRoom,
      projectionDay: model.reservationProjection.projectionDay
    };
    let params = ModelUtil.getParams(m);
    this.httpClient.get(RESERVATIONS, { params })
      .subscribe(
        (data: ReservationModel[]) => {
          this.emitGetSuccess(data);
        },
        (err) => { this.emitPostError(err)  },
        () => { }
      );
  }
}
