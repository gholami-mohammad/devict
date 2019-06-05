import { Component, OnInit } from '@angular/core';
import { IError } from 'src/app/models/error';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { SnackerService } from 'src/app/services/snacker.service';
import { TranslateService } from 'src/app/services/translate.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-translate',
  templateUrl: './translate.component.html',
  styleUrls: ['./translate.component.scss'],
  providers: [ TranslateService ],
})
export class TranslateComponent implements OnInit {
  loading = false;
  errors: IError = {};
  basicInfo: any = {};
  wordToTranslate: any = {};
  word: any;

  constructor(
    private errHandler: ErrorHandlerService,
    private snacker: SnackerService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private translateService: TranslateService) { }

  ngOnInit() {
    this.translateService.getBasicInfo().subscribe(res => {
      this.basicInfo = res;
      this.loadFiltersFormQueryParams();
      this.loadLastSelectedLanguages();
      this.searchForTranslation();
    });
  }

  handleHttpError(err: HttpErrorResponse) {
    this.loading = false;
    this.errors = this.errHandler.HandleResponseErrors(err);
    this.snacker.error(this.errors);
  }

  loadLastSelectedLanguages() {
    const lastFrom = this.getLastSelectedLang('from');
    if (lastFrom && ! this.wordToTranslate.from_language) {
      this.wordToTranslate.from_language = lastFrom;
    }

    const lastTo = this.getLastSelectedLang('to');
    if (lastTo && ! this.wordToTranslate.to_language) {
      this.wordToTranslate.to_language = lastTo;
    }
  }

  loadFiltersFormQueryParams() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.wordToTranslate.word = params['word'];
      this.wordToTranslate.from_language = params['from_language'];
      this.setLastSelectedLanguage('from');
      this.wordToTranslate.to_language = params['to_language'];
      this.setLastSelectedLanguage('to');
    });
  }

  setLastSelectedLanguage(target: string) {
    if (!this.wordToTranslate[target + '_language']) {
      return;
    }
    localStorage.setItem('last_' + target + '_language', this.wordToTranslate[target + '_language']);
  }

  getLastSelectedLang(target: string): string {
    return localStorage.getItem('last_' + target + '_language');
  }

  searchForTranslation() {
    if (! this.hasValidDate()) {
      return;
    }
    this.updateRouterQueryParams();
    this.loading = true;
    this.translateService.searchForTranslation(this.wordToTranslate).subscribe(res => {
      this.loading = false;
      this.word = res;
    }, err => {
      this.handleHttpError(err);
    });
  }

  updateRouterQueryParams() {
    const params = this.wordToTranslate;
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: params,
      queryParamsHandling: 'merge'
    });
  }

  hasValidDate() {
    return this.wordToTranslate.word && this.wordToTranslate.from_language && this.wordToTranslate.to_language;
  }

}
