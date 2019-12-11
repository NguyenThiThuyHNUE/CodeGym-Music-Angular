import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Url} from '../../../url-project';
import {IUserResponse} from '../interface/i-user-response';
import {map} from 'rxjs/operators';
import {LoginResponse} from '../interface/login-response';
import {Observable} from 'rxjs';
import {TokenRespone} from '../interface/token-respone';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {
  }

  userRegister(info) {
    return this.http.post<IUserResponse>(Url + '/api/register', info);
  }

  userLogin(userCredential) {
    return this.http.post<LoginResponse>(Url + '/api/login', userCredential);
  }

  logout() {
    localStorage.removeItem('token');
  }

  isLoggedIn() {
    return !!localStorage.getItem('token');
  }

  getUserCredential(userToken): Observable<TokenRespone> {
    return this.http.get<TokenRespone>(Url + `/api/me?token=${userToken}`);
  }

}
