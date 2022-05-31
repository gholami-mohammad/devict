import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SimpleModalComponent } from 'ngx-simple-modal';
import { ToastrService } from 'ngx-toastr';
import { Translation } from 'src/app/models/translation';
import { Word } from 'src/app/models/word';
import { BasicInfoService } from 'src/app/services/basic-info.service';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { TranslationService } from 'src/app/services/translation.service';

@Component({
  selector: 'app-translation-form',
  templateUrl: './translation-form.component.html',
  styleUrls: ['./translation-form.component.scss']
})
export class TranslationFormComponent extends SimpleModalComponent<{word: Word, translation: Translation}, boolean> implements OnInit {

  loading = false;
  errors: any = {};
  translation: Translation = new Translation();
  word: Word = new Word();
  basicInfo: any = {};

  constructor(private translationService: TranslationService, private errService: ErrorHandlerService, private toastr: ToastrService, private basicInfoService: BasicInfoService) {
    super();
  }

  ngOnInit(){
    if (!this.translation.language_alpha2code) {
      this.translation.language_alpha2code = 'fa';
    }

    if (this.translation.id) {
      this.getDetails();
    }
    this.basicInfoService.get(['parts_of_speech']).subscribe({
      next: res => this.basicInfo = res,
      error: err => {
        this.errors = this.errService.HandleResponseErrors(err);
      }
    });
  }

  save() {
    this.loading = true;
    this.errors = {};

    this.translationService.save(this.translation).subscribe({
      next: res => {
        this.translation = res.data as Translation;
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
    if (!this.translation.id) {
      return;
    }
    this.loading = true;
    this.translationService.details(this.translation.id).subscribe({
      next: res => {
        this.translation = res;
        this.loading = false;
      },
      error: err => {
        this.errService.HandleResponseErrors(err);
        this.loading = false;
      }
    });
  }

}
