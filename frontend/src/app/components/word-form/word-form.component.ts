import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { NgxModalComponent } from 'ngx-modalview';
import { ToastrService } from 'ngx-toastr';
import { SaveResponse } from 'src/app/models/response-models';
import { Word } from 'src/app/models/word';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { WordService } from 'src/app/services/word.service';

@Component({
  selector: 'app-word-form',
  templateUrl: './word-form.component.html',
  styleUrls: ['./word-form.component.scss']
})
export class WordFormComponent extends NgxModalComponent<{word: Word}, boolean> implements OnInit, AfterViewInit, OnDestroy {
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

  ngAfterViewInit(): void {
    this.registerHotkeys();
  }

  ngOnDestroy(): void {
    this.unregisterHotKeys();
  }

  registerHotkeys() {
    document.onkeydown = (e) => {
      if (e.code == 'F2') {
        e.preventDefault();
        this.save(false);
      }
      if (e.code == 'F3') {
        e.preventDefault();
        this.save(true);
      }
      if (e.code == 'Escape') {
        e.preventDefault();
        this.close();
      }
    };
  }

  unregisterHotKeys() {
    document.onkeydown = (e) => {
    };
  }

  save(close = false) {
    this.loading = true;
    this.errors = {};

    this.wordService.save(this.word).subscribe({
      next: (res: SaveResponse<Word>) => {
        this.word = res.data as Word;
        this.loading = false;
        this.result = true;
        this.toastr.success(res.message);
        if (close) {
          this.close();
        }
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


