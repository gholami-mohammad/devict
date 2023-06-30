import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { debounceTime } from 'rxjs';
import { Word } from 'src/app/models/word';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { WordService } from 'src/app/services/word.service';
import { Pagination } from '../pagination/pagination-model';
import { WordFormComponent } from '../word-form/word-form.component';
import { NgxModalService } from 'ngx-modalview';
import {
  ConfigDialog,
  ConfirmDialogComponent,
} from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-word-index',
  templateUrl: './word-index.component.html',
  styleUrls: ['./word-index.component.scss'],
})
export class WordIndexComponent implements OnInit, AfterViewInit, OnDestroy {
  loading = true;
  pagination: Pagination<Word> = new Pagination();
  page = 1;
  searchFormControl: UntypedFormControl = new UntypedFormControl();

  constructor(
    private wordService: WordService,
    private modal: NgxModalService,
    private errService: ErrorHandlerService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.index(this.page);

    this.searchFormControl.valueChanges.pipe(debounceTime(300)).subscribe({
      next: (val) => {
        this.index(this.page, val);
      },
    });
  }

  ngAfterViewInit(): void {
    this.registerHotkeys();
  }

  ngOnDestroy(): void {
    this.unregisterHotKeys();
  }


  registerHotkeys() {
    document.onkeydown = (e) => {
      if (e.code == 'F1') {
        e.preventDefault();
        this.add();
      }
    };
  }

  unregisterHotKeys() {
    document.onkeydown = (e) => {
    };
  }

  index(page: number, searchText?: string) {
    return this.wordService.index(page, 50, searchText).subscribe({
      next: (res) => {
        this.pagination = res;
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
      },
    });
  }

  add() {
    this.unregisterHotKeys();
    this.modal
      .addModal(WordFormComponent, {
        word: new Word(),
      })
      .subscribe((res) => {
        this.registerHotkeys()
        if (res) {
          this.index(this.page);
        }
      });
  }

  edit(word: Word) {
    this.unregisterHotKeys();
    this.modal
      .addModal(WordFormComponent, {
        word: word,
      })
      .subscribe((res) => {
        this.registerHotkeys()
        if (res) {
          this.index(this.page);
        }
      });
  }

  delete(word: Word) {
    this.modal
      .addModal(ConfirmDialogComponent, {
        config: {
          message: 'Are you sure to delete selected word?',
          confirmLabel: 'Yes, Delete it',
          cancelLabel: 'Cancel',
          title: 'WARNING',
        },
      })
      .subscribe((res) => {
        if (!res) {
          return;
        }

        this.wordService.delete(word.id ? word.id : 0).subscribe({
          next: (res) => {
            this.index(this.page);
            this.toastr.success(res.message);
          },
          error: (err) => {
            this.errService.HandleResponseErrors(err);
            this.loading = false;
          },
        });
      });
  }
}
