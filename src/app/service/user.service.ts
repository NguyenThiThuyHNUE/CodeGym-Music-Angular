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

  static getUserToken() {
    return localStorage.getItem('token');
  }

  static getUserName() {
    return localStorage.getItem('name');
  }

  static getUserEmail() {
    return localStorage.getItem('email');
  }

  static getUserId() {
    return +localStorage.getItem('id');
  }

  static getUserImageWithoutCheckExist() {
    return localStorage.getItem('image');
  }

  static isUserHasImage() {
    return !!UserService.getUserImageWithoutCheckExist();
  }

  static getUserAvatar() {
    if (!UserService.isUserHasImage()) {
      return '../../../assets/img/bg-img/bg-7.jpg';
    }
    return UserService.getUserImageWithoutCheckExist();
  }

  userRegister(info) {
    return this.http.post<IUserResponse>(Url + '/api/register', info);
  }

  userLogin(userCredential) {
    return this.http.post<LoginResponse>(Url + '/api/login', userCredential);
  }

  userLoginFacebook(userCredential) {
    return this.http.post<LoginResponse>(Url + '/api/facebook/login', userCredential);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('email');
    localStorage.removeItem('name');
    localStorage.removeItem('image');
  }

  isLoggedIn() {
    return !!localStorage.getItem('token');
  }

  isLoggedInFacebook() {
    return !!localStorage.getItem('authToken');
  }

  getUserCredential(): Observable<TokenRespone> {
    if (localStorage.getItem('token')) {
      return this.http.get<TokenRespone>(Url + `/api/me?token=${localStorage.getItem('token')}`);
    }
  }

  updateUser(updateInfo) {
    return this.http.post(Url + `/api/update?token=${localStorage.getItem('token')}`, updateInfo);
  }

  changePassword(data) {
    return this.http.post<Response>(Url + '/api/changePassword', data);
  }

  saveDataToLocalStorage(response: any) {
    localStorage.setItem('id', response.id);
    localStorage.setItem('name', response.name);
    localStorage.setItem('email', response.email);
    localStorage.setItem('image', response.image);
  }

  saveToken(res) {
    localStorage.setItem('token', res.access_token);
  }
}
