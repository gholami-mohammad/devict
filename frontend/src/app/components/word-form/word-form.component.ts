import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SimpleModalComponent } from 'ngx-simple-modal';
import { ToastrService } from 'ngx-toastr';
import { Translation } from 'src/app/models/translation';
import { Word } from 'src/app/models/word';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { WordService } from 'src/app/services/word.service';

@Component({
  selector: 'app-word-form',
  templateUrl: './word-form.component.html',
  styleUrls: ['./word-form.component.scss']
})
export class WordFormComponent extends SimpleModalComponent<{word: Word}, boolean> implements OnInit {
  loading = false;
  errors: any = {};
  word: Word = new Word();
  constructor(private wordService: WordService, private errService: ErrorHandlerService, private toastr: ToastrService) {
    super();
  }

  ngOnInit(){
    if (!this.word.language_alpha2code) {
      this.word.language_alpha2code = 'en';
    }

    if (this.word.id) {
      this.getDetails();
    }
  }

  save() {
    this.loading = true;
    this.errors = {};

    this.wordService.save(this.word).subscribe({
      next: res => {
        this.word = res.data as Word;
        this.loading = false;
        this.result = true;
        this.toastr.success(res.message);
        this.close();
      },
      error: (err: HttpErrorResponse) => {
        this.errors = this.errService.HandleResponseErrors(err);
        this.loading = false;
      },
    });
  }

  getDetails() {
    if (!this.word.id) {
      return;
    }
    this.loading = true;
    this.wordService.details(this.word.id).subscribe({
      next: res => {
        this.word = res;
        this.loading = false;
      },
      error: err => {
        this.errService.HandleResponseErrors(err);
        this.loading = false;
      }
    });
  }
}


