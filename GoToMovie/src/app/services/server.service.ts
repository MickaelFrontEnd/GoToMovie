import { Subject } from 'rxjs/Subject';
import ResponseModel from '../models/response.model';

export default class ServerService {
  getSubject: Subject<any> = new Subject<any> ();
  postSubject: Subject<ResponseModel> = new Subject<ResponseModel> ();
  putSubject: Subject<ResponseModel> = new Subject<ResponseModel> ();
  deleteSubject: Subject<ResponseModel> = new Subject<ResponseModel> ();
  postResponseSubject: Subject<any> = new Subject<any>();

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

  emitPostResponseSuccess(result: any) {
    this.postResponseSubject.next(result);
  }

  emitPostResponseError(error: ResponseModel) {
    this.postResponseSubject.error(error);
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
