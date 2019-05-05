import ProjectionModel from '../models/projection.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PROJECTIONS } from './url.service';
import ServerService from './server.service';
import ResponseModel from '../models/response.model';

@Injectable()
export default class ProjectionService extends ServerService {

  constructor(private httpClient: HttpClient) { super(); }

  addProjection(projection: ProjectionModel) {
    this.httpClient.post(PROJECTIONS, projection)
      .subscribe(
        (data: ResponseModel) => {
          this.emitPostSuccess(data);
        },
        (err) => { this.emitPostError(err)  },
        () => { }
      );
  }

  getProjection() {
    this.httpClient.get(PROJECTIONS)
      .subscribe(
        (data: ProjectionModel[]) => {
          this.emitGetSuccess(data);
        },
        (err) => { this.emitPostError(err)  },
        () => { }
      );
  }

  getProjectionDetail(id: string) {
    this.httpClient.get(PROJECTIONS + '/' + id)
      .subscribe(
        (data: ProjectionModel[]) => {
          this.emitGetSuccess(data);
        },
        (err) => { this.emitPostError(err)  },
        () => { }
      );
  }
}
