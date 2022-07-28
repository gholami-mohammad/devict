import { Component, Input, OnInit } from '@angular/core';
import { Word } from 'src/app/models/word';

@Component({
  selector: 'app-review-status',
  templateUrl: './review-status.component.html',
  styleUrls: ['./review-status.component.scss'],
})
export class ReviewStatusComponent implements OnInit {
  @Input() word!: Word;
  constructor() {}

  ngOnInit(): void {}
}
