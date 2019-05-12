import { HttpParams } from  "@angular/common/http";

export default class ModelUtil {
  static getParams(model: any): HttpParams {
    let params = new  HttpParams();
    for (var property in model) {
      if (model.hasOwnProperty(property)) {
          if(model[property] !== undefined && model[property] !== '' && model[property] !== null) {
            params = params.set(property, model[property]);
          }
      }
    }
    return params;
  }
}
