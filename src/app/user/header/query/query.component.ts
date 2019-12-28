import {Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild, ViewEncapsulation} from '@angular/core';
import {timer} from 'rxjs';
import {FormBuilder, Validators} from '@angular/forms';

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

  constructor(private fb: FormBuilder,
  ) {
  }

  ngOnInit() {
    const timer$ = timer(2000, 5000);
    timer$.subscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  get searchInput() {
    return this.form.get('searchInput');
  }
}
