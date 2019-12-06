import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Url} from '../../../url-project';
import {Observable} from 'rxjs';
import {IUserResponse} from '../interface/i-user-response';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {
  }

  userRegister(info) {
    return this.http.post<IUserResponse>(Url + '/api/register', info);
  }
}
