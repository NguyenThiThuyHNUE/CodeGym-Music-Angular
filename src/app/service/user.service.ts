import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Url} from '../../../url-project';
import {IUserResponse} from '../interface/i-user-response';
import {map} from 'rxjs/operators';
import {LoginResponse} from '../interface/login-response';
import {Observable} from 'rxjs';
import {TokenRespone} from '../interface/token-respone';
import {Response} from '../interface/response';

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
      // tslint:disable-next-line:max-line-length
      return 'https://firebasestorage.googleapis.com/v0/b/codegym-music-d1055.appspot.com/o/music%2Fbg-7.jpg?alt=media&token=fde1a560-92b5-4bf8-977b-33c26332496d';
    }
    return UserService.getUserImageWithoutCheckExist();
  }

  static logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('email');
    localStorage.removeItem('name');
    localStorage.removeItem('image');
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
  getSingerOfUser(): Observable<Response> {
      return this.http.get<Response>(Url + `/api/user-singer?token=${UserService.getUserToken()}`);
  }

  updateUser(updateInfo) {
    return this.http.post(Url + `/api/update?token=${localStorage.getItem('token')}`, updateInfo);
  }

  changePassword(data) {
    return this.http.post<Response>(Url + `/api/changePassword?token=${UserService.getUserToken()}`, data);
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
