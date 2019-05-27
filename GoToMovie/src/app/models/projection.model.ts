import ReferenceModel from './reference.model';
import MovieModel from './movie.model';
import RoomModel from './room.model';

export default class ProjectionModel {
  constructor(
    public _id: string,
    public projectionRoom: RoomModel,
    public projectionMovie: MovieModel,
    public projectionDay: string,
    public projectionBegin: string,
    public projectionEnd: string,
    public projectionFreeSeats?: string[]
  ) {}
}
