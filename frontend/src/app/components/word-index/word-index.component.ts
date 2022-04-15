import { Component, OnInit } from '@angular/core';
import { WordService } from 'src/app/services/word.service';

@Component({
  selector: 'app-word-index',
  templateUrl: './word-index.component.html',
  styleUrls: ['./word-index.component.scss'],
})
export class WordIndexComponent implements OnInit {
  words: any[] = [];
  page = 1;

  constructor(private wordService: WordService) {}

  ngOnInit(): void {
    this.index(this.page);
  }

  index(page: number) {
    return this.wordService.index(page, 50).subscribe({
      next: res => {},
      error: err => {},
    });
  }
}
