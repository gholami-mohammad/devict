import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pagination } from '../components/pagination/pagination-model';
import { SaveResponse, MessageResponse } from '../models/response-models';
import { Word } from '../models/word';

@Injectable({
  providedIn: 'root'
})
export class WordService {

  constructor(private http: HttpClient) { }

  index(page: number, perPage: number, searchText?: string) {
    let params = new HttpParams().set('page', page).set('per_page', perPage);
    if (searchText) {
      params = params.set('q', searchText);
    }

    return this.http.get<Pagination<Word>>('/api/words', {params: params});
  }

  save(word: Word) {
    const path = '/api/words' + (word.id ? `/${word.id}` : '');
    return this.http.post<SaveResponse<Word>>(path, word);
  }

  details(wordID: number) {
    const path = `/api/words/${wordID}`;
    return this.http.get<Word>(path);
  }

  delete(wordID: number) {
    const path = `/api/words/${wordID}`;
    return this.http.delete<MessageResponse>(path);
  }
}
