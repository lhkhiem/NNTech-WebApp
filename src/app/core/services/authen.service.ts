import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SystemConstants } from '../common/system.constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenService {

  constructor(private _http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    const body = {
      'userName': encodeURIComponent(username),
      'password': encodeURIComponent(password)
    }

    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    return this._http.post<any>(SystemConstants.BASE_API +
      '/api/users/authenticate', body, httpOptions)
      .pipe();


  }
  logout() {
    localStorage.removeItem(SystemConstants.CURRENT_USER);
  }
  isUserAuthenticated(): boolean {
    return true;
  }
  getLoggedInUser(): any {
    return null;
  }


}
