import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Url} from '../../../url-project';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {
  }

  userRegister(info) {
    return this.http.post(Url + '/api/register', info);
  }
}
