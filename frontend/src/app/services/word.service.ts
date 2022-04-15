import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WordService {

  constructor(private http: HttpClient) { }

  index(page: number, perPage: number) {
    return this.http.get<any>('/api/words', {params: new HttpParams().set('page', page).set('per_page', perPage)});
  }
}
