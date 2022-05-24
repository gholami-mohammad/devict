import { Component, OnInit } from '@angular/core';
import { SimpleModalService } from 'ngx-simple-modal';
import { ToastrService } from 'ngx-toastr';
import { Word } from 'src/app/models/word';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { WordService } from 'src/app/services/word.service';
import { Pagination } from '../pagination/pagination-model';
import { WordFormComponent } from '../word-form/word-form.component';

@Component({
  selector: 'app-word-index',
  templateUrl: './word-index.component.html',
  styleUrls: ['./word-index.component.scss'],
})
export class WordIndexComponent implements OnInit {
  loading = true;
  pagination: Pagination<Word> = new Pagination();
  page = 1;

  constructor(private wordService: WordService, private modal: SimpleModalService, private errService: ErrorHandlerService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.index(this.page);
  }

  index(page: number) {
    return this.wordService.index(page, 50).subscribe({
      next: res => {
        this.pagination = res;
        this.loading = false;
      },
      error: err => {
        this.loading = false;
      },
    });
  }

  add() {
    this.modal.addModal(WordFormComponent, {
      word: new Word(),
    }).subscribe(res => {
      if (res) {
        this.index(this.page);
      }
    });
  }

  edit(word: Word) {
    this.modal.addModal(WordFormComponent, {
      word: word,
    }).subscribe(res => {
      if (res) {
        this.index(this.page);
      }
    });
  }

  delete(word: Word) {
    if (!confirm("Are you sure?")) {
      return;
    }
    return this.wordService.delete(word.id ? word.id : 0).subscribe({
      next: res => {
        this.index(this.page);
        this.toastr.success(res.message);
      },
      error: err => {
        this.errService.HandleResponseErrors(err);
        this.loading = false;
      },
    });
  }
}
