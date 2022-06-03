import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as _ from 'lodash';
import { SelectedTranslation } from 'src/app/models/third-party-translation';
import { ThirdPartyTranslatorService } from 'src/app/services/third-party-translator.service';
import { Entry, GoogleTranslateResponse } from './google-translate-model';

@Component({
  selector: 'app-google-translator',
  templateUrl: './google-translator.component.html',
  styleUrls: ['./google-translator.component.scss']
})
export class GoogleTranslatorComponent implements OnInit {

  private _word: string = '';
  @Input()
  set word(w: string) {
    this._word = w;
    if (!w || w == '') {
      this.googleTranslateData = undefined;
    }
  };

  get word(): string {
    return this._word ?? '';
  }

  @Output() selectedEntry: EventEmitter<SelectedTranslation> = new EventEmitter();

  loading = false;
  googleTranslateData?: GoogleTranslateResponse;

  constructor(private thirdPartyTranslatorService: ThirdPartyTranslatorService) { }

  ngOnInit() {
  }

  getEntryRowClicked(entry: Entry, partOfSpeech?: string) {
    const emitData = {
      part_of_speech: partOfSpeech,
      translation: entry.word,
      examples: [],
      synonyms: entry.reverse_translation,
    };

    this.selectedEntry.emit(emitData);
  }

  normalizedSynonyms(translations: string[]) {
    const arr =  _.remove(translations, (item: string) => {
      return this.word != item;
    });

    return arr;
  }

  translateUsingGoogle(text: string) {
    this.googleTranslateData = undefined;
    this.loading = true;
    this.thirdPartyTranslatorService.translate(text, 'google').subscribe({
      next: res => {
        if (res.dict) {
          res.dict.forEach((dic, index) => {
            dic.entry.forEach((e, i) => {
              res.dict[index].entry[i].reverse_translation = this.normalizedSynonyms(e.reverse_translation);
            });
          });
        }

        this.googleTranslateData = res;
        this.loading = false;
      },
      error: err => {
        this.loading = false;
      },
    });
  }

  clear() {
    this.googleTranslateData = undefined;
  }

}
