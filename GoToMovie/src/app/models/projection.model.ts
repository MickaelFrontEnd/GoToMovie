import ReferenceModel from './reference.model';

export default class ProjectionModel {
  constructor(
    public _id: string,
    public projectionRoom: string,
    public projectionMovie: string,
    public projectionDay: string,
    public projectionBegin: string,
    public projectionEnd: string
  ) {}
}
