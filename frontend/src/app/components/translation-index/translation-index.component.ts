import { Component, Input, OnInit } from '@angular/core';
import { SimpleModalService } from 'ngx-simple-modal';
import { ToastrService } from 'ngx-toastr';
import { Translation } from 'src/app/models/translation';
import { Word } from 'src/app/models/word';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { TranslationService } from 'src/app/services/translation.service';
import { TranslationFormComponent } from '../translation-form/translation-form.component';

@Component({
  selector: 'app-translation-index',
  templateUrl: './translation-index.component.html',
  styleUrls: ['./translation-index.component.scss']
})
export class TranslationIndexComponent implements OnInit {

  @Input() word: Word = new Word();
  loading = true;
  translations: Translation[] = [];

  constructor(private translationService: TranslationService, private modal: SimpleModalService, private errService: ErrorHandlerService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.index();
  }

  index() {
    return this.translationService.index(this.word.id ?? 0, 'fa').subscribe({
      next: res => {
        this.translations = res;
        this.loading = false;
      },
      error: err => {
        this.loading = false;
      },
    });
  }

  add() {
    let translation = new Translation();
    translation.word_id = this.word.id ?? 0;

    this.modal.addModal(TranslationFormComponent, {
      translation: translation,
      word: this.word,
    }).subscribe(res => {
      if (res) {
        this.index();
      }
    });
  }

  edit(translation: Translation) {
    this.modal.addModal(TranslationFormComponent, {
      translation: translation,
      word: this.word,
    }).subscribe(res => {
      if (res) {
        this.index();
      }
    });
  }

  delete(translation: Translation) {
    if (!confirm("Are you sure?")) {
      return;
    }
    return this.translationService.delete(translation.id ?? 0).subscribe({
      next: res => {
        this.index();
        this.toastr.success(res.message);
      },
      error: err => {
        this.errService.HandleResponseErrors(err);
        this.loading = false;
      },
    });
  }

}
