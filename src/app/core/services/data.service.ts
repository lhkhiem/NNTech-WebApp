import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { MessageContstants } from '../common/message.constants';
import { SystemConstants } from '../common/system.constants';
import { AuthenService } from './authen.service';
import { NotifyService } from './notify.service';
import { UtilityService } from './utility.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private headers = new HttpHeaders();
  constructor(
    private _authenService: AuthenService,
    private _http: HttpClient,
    private _notifyService: NotifyService,
    private _utilityService: UtilityService) {
    this.headers = this.headers.set('Content-Type', 'application/json');
    this.headers = this.headers.set("Authorization", "Bearer " + _authenService.getLoggedInUser());
  }


  get(uri: string) {
    return this._http.get(environment.BASE_API + uri, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }
  post(uri: string, data?: any) {

    return this._http.post(environment.BASE_API + uri, data, { headers: this.headers })
      .pipe(catchError(this.handleError.bind(this)));
  }
  put(uri: string, data?: any) {

    return this._http.put(environment.BASE_API + uri, data, { headers: this.headers })
      .pipe(catchError(this.handleError.bind(this)));
  }
  delete(uri: string, key: string, id: string) {

    return this._http.delete(environment.BASE_API + uri + "/?" + key + "=" + id, { headers: this.headers })
      .pipe(catchError(this.handleError.bind(this)));
  }
  deleteWithMultiParams(uri: string, params: any) {
    var paramStr: string = '';
    for (let param in params) {
      paramStr += param + "=" + params[param] + '&';
    }
    return this._http.delete(environment.BASE_API + uri + "/?" + paramStr, { headers: this.headers })
      .pipe(catchError(this.handleError.bind(this)));

  }
  postFile(uri: string, data?: any) {
    let newHeader = new HttpHeaders();
    newHeader.set("Authorization", "Bearer " + this._authenService.getLoggedInUser());
    return this._http.post(environment.BASE_API + uri, data, { headers: newHeader })
      .pipe(catchError(this.handleError.bind(this)));
  }
  public handleError(error: HttpErrorResponse) {

    if (error.status === 400) {
      localStorage.removeItem(SystemConstants.CURRENT_USER);
      this._notifyService.printError(error.error.message);
      //console.log(MessageContstants.SERVER_RESPONE_MSG, error.error);
      
    }
    else if (error.status === 401) {//Lỗi xác thực người dùng
      localStorage.removeItem(SystemConstants.CURRENT_USER);
      this._notifyService.printError(error.error.message);
      this._utilityService.navigateToLogin();
      //console.log(MessageContstants.SERVER_RESPONE_MSG, error.error);
    }
    else if (error.status === 403) {//Không quyền truy cập
      localStorage.removeItem(error.error.message);
      this._utilityService.navigateToLogin();
      //console.log(MessageContstants.SERVER_RESPONE_MSG, error.error);
    }
    else {
      //let errMsg = JSON.parse(error.error).Message;
      //console.log(errMsg);
    }
    return throwError(error.error);
  }
//   public handleError(error: HttpErrorResponse) {
//     if (error.status === 400) {
//       localStorage.removeItem(SystemConstants.CURRENT_USER);
//       console.log(MessageContstants.LOGIN_AGAIN_MSG);
//       console.error('An error occurred:', error.error);
//     } else {
//       // The backend returned an unsuccessful response code.
//       // The response body may contain clues as to what went wrong.
//       console.error(
//         `Backend returned code ${error.status}, body was: `, error.error);
//     }
//     // Return an observable with a user-facing error message.
//     return throwError(
//       'Something bad happened; please try again later.');
//   }
}
