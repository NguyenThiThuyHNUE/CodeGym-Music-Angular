import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Url} from '../../../url-project';
import {IUserResponse} from '../interface/i-user-response';
import {map} from 'rxjs/operators';
import {LoginResponse} from '../interface/login-response';

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
}
