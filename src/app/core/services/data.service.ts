import { HttpClient,  HttpErrorResponse,  HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
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
    private _router: Router,
    private _notifyService: NotifyService,
    private _utilityService: UtilityService) {
    this.headers = this.headers.set('Content-Type', 'application/json');
    //this.headers = this.headers.set("Authorization", "Bearer " + _authenService.getLoggedInUser().tokenString);
  }


  get(uri: string) {

    return this._http.get(environment.BASE_API + uri, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }
  post(uri: string, data?: any) {

    return this._http.post(environment.BASE_API + uri, data, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }
  put(uri: string, data?: any) {

    return this._http.put(environment.BASE_API + uri, data, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }
  delete(uri: string, key: string, id: string) {

    return this._http.delete(environment.BASE_API + uri + "/?" + key + "=" + id, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }
  deleteWithMultiParams(uri: string, params:any) {
    var paramStr: string = '';
    for (let param in params) {
      paramStr += param + "=" + params[param] + '&';
    }
    return this._http.delete(environment.BASE_API + uri + "/?" + paramStr, { headers: this.headers })
      .pipe(catchError(this.handleError));

  }
  postFile(uri: string, data?: any) {
    let newHeader = new HttpHeaders();
    newHeader.set("Authorization", "Bearer " + this._authenService.getLoggedInUser().access_token);
    return this._http.post(environment.BASE_API + uri, data, { headers: newHeader })
      .pipe(catchError(this.handleError));
  }
  public  handleError(error: HttpErrorResponse) {
    if (error.status === 400) {
      localStorage.removeItem(SystemConstants.CURRENT_USER);
      this._notifyService.notifyError(MessageContstants.LOGIN_AGAIN_MSG,'Lỗi');
      this._utilityService.navigateToLogin();
    }
    else if (error.status === 401) {
      localStorage.removeItem(SystemConstants.CURRENT_USER);
      this._notifyService.notifyError(MessageContstants.LOGIN_AGAIN_MSG,'Lỗi');
      this._utilityService.navigateToLogin();
    }
    else if (error.status === 403) {
      localStorage.removeItem(SystemConstants.CURRENT_USER);
      this._notifyService.notifyError(MessageContstants.FORBIDDEN,'Lỗi');
      this._utilityService.navigateToLogin();
    }
    else {
      let errMsg = JSON.parse(error.error).Message;
      this._notifyService.notifyError(errMsg,'Lỗi');
    }
    return throwError(
      'Một số lỗi không xác định đã xảy ra');
  }
  // private handleError(error: HttpErrorResponse) {
  //   if (error.status === 0) {
  //     // A client-side or network error occurred. Handle it accordingly.
  //     console.error('An error occurred:', error.error);
  //   } else {
  //     // The backend returned an unsuccessful response code.
  //     // The response body may contain clues as to what went wrong.
  //     console.error(
  //       `Backend returned code ${error.status}, body was: `, error.error);
  //   }
  //   // Return an observable with a user-facing error message.
  //   return throwError(
  //     'Something bad happened; please try again later.');
  // }
}
