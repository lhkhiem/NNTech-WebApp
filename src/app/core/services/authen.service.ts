import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SystemConstants } from '../common/system.constants';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenService {

  constructor(private _http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    const body = {
      'userName': encodeURIComponent(username),
      'password': password//encodeURIComponent(password)
    }

    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    return this._http.post<any>(environment.BASE_API +
      '/api/user/authenticate', body, httpOptions)
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
