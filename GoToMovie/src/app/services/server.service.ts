import { Subject } from 'rxjs/Subject';
import ResponseModel from '../models/response.model';

export default class ServerService {
  getSubject: Subject<any> = new Subject<any> ();
  postSubject: Subject<ResponseModel> = new Subject<ResponseModel> ();
  putSubject: Subject<ResponseModel> = new Subject<ResponseModel> ();
  deleteSubject: Subject<ResponseModel> = new Subject<ResponseModel> ();

  emitGetSuccess(result: any) {
    this.getSubject.next(result);
  }

  emitGetError(error: any) {
    this.getSubject.error(error);
  }

  emitPostSuccess(result: ResponseModel) {
    this.postSubject.next(result);
  }

  emitPostError(error: ResponseModel) {
    this.postSubject.error(error);
  }

  emitPutSuccess(result: ResponseModel) {
    this.putSubject.next(result);
  }

  emitPutError(error: ResponseModel) {
    this.putSubject.error(error);
  }

  emitDeleteSuccess(result: ResponseModel) {
    this.deleteSubject.next(result);
  }

  emitDeleteError(error: ResponseModel) {
    this.deleteSubject.error(error);
  }
}
