import UserModel from './user.model';
import ProjectionModel from './projection.model';

export default class ReservationModel {
  constructor(
    public _id: string,
    public reservationUser: UserModel,
    public reservationProjection: ProjectionModel,
    public reservationSeats: string[]
  ){}
}
