import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {UserService} from '../service/user.service';
import {SnotifyService} from 'ng-snotify';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: UserService, private Notify: SnotifyService, private router: Router) {
  }


  canActivate(): boolean {
    if (this.auth.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/home']).then(() => {
        alert('You need to login to use this feature');
      });
      return false;
    }
  }
}
