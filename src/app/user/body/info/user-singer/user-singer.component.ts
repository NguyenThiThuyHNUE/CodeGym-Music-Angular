import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../../service/user.service';

@Component({
  selector: 'app-user-singer',
  templateUrl: './user-singer.component.html',
  styleUrls: ['./user-singer.component.scss']
})
export class UserSingerComponent implements OnInit {
  singer: any;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.getSingerOfUser();
  }

  getSingerOfUser() {
    this.userService.getSingerOfUser().subscribe((response) => {
      this.singer = response.data;
    });
  }
}
