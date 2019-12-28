import {Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild, ViewEncapsulation} from '@angular/core';
import {timer} from 'rxjs';
import {FormBuilder, Validators} from '@angular/forms';
import {MusicService} from '../../../service/music.service';
import {IMusic} from '../../../interface/i-music';

@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class QueryComponent implements OnInit, OnChanges {

  searchValue: string;
  form = this.fb.group({
    searchInput: ['', Validators.required],
  });

  songs: IMusic[];
  private willShowResult: boolean;

  constructor(private fb: FormBuilder,
              private songService: MusicService,
  ) {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  get searchInput() {
    return this.form.get('searchInput');
  }

  onClick() {
    console.log('onclick');
  }

  showResult() {
    this.willShowResult = true;
  }

  hideResult() {
    this.willShowResult = false;
  }
}
