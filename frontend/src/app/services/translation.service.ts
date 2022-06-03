import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pagination } from '../components/pagination/pagination-model';
import { SaveResponse, MessageResponse } from '../models/response-models';
import { Translation } from '../models/translation';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  constructor(private http: HttpClient) { }

  index(wordID: number, lang: string) {
    return this.http.get<Translation[]>(`/api/translations`, {
      params: new HttpParams().append('word_id', wordID).append('lang', lang),
    });
  }

  save(translation: Translation) {
    const path = `/api/translations/${translation.id ?? ''}`;
    return this.http.post<SaveResponse<Translation>>(path, translation);
  }

  details(translationID: number) {
    const path = `/api/translations/${translationID}`;
    return this.http.get<Translation>(path);
  }

  delete(translationID: number) {
    const path = `/api/translations/${translationID}`;
    return this.http.delete<MessageResponse>(path);
  }
}
