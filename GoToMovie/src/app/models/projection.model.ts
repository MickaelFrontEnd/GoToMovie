import ReferenceModel from './reference.model';
import MovieModel from './movie.model';

export default class ProjectionModel {
  constructor(
    public _id: string,
    public projectionRoom: string,
    public projectionMovie: MovieModel,
    public projectionDay: string,
    public projectionBegin: string,
    public projectionEnd: string
  ) {}
}

export class ProjectionListModel {
  constructor(
    public _id: string,
    public projectionRoom: string,
    public projectionMovie: MovieModel,
    public projectionDay: string,
    public projectionBegin: string,
    public projectionEnd: string
  ) {}
}
