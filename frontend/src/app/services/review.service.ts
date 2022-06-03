import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pagination } from '../components/pagination/pagination-model';
import { SaveResponse } from '../models/response-models';
import { Word } from '../models/word';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http: HttpClient) { }

  index(page: number, perPage: number) {
    return this.http.get<Pagination<Word>>('/api/review', {params: new HttpParams().set('page', page).set('per_page', perPage)});
  }

  save(wordID: number, remembered: boolean) {
    const path = `/api/review/${wordID}`;
    return this.http.post<SaveResponse<Word>>(path, {remembered: remembered});
  }
}
