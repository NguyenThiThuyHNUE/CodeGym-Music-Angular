import {Component, OnInit} from '@angular/core';
import {SingerService} from '../../../service/singer.service';

@Component({
  selector: 'app-singer',
  templateUrl: './singer.component.html',
  styleUrls: ['./singer.component.scss']
})
export class SingerComponent implements OnInit {
  singers: any;

  constructor(private singerService: SingerService) {
  }

  ngOnInit() {
    this.getSingers();
  }

  getSingers() {
    this.singerService.getSingers().subscribe(
      (response) => {
        this.handleGetSingerResponse(response);
      }
    );
  }

  handleGetSingerResponse(response) {
    this.singers = response.data;
  }
}
