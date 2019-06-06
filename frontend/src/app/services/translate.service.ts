import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslateService {

  constructor(private http: HttpClient) { }

  getBasicInfo(): Observable<any[]> {
    return this.http.get<any[]>('/api/v2/userarea/translate/basic_info');
  }

  searchForTranslation(word: any): Observable<any> {
    return this.http.post<any>('/api/v2/userarea/translate/search', word);
  }

  save(translation: any) {
    let url = '/api/v2/userarea/translate/save';
    if (translation.id) {
      url += '/' + translation.id;
    }
    return this.http.post<any>(url, translation);
  }

  deleteTranslation(id: number): Observable<any> {
    return this.http.get<any>('/api/v2/userarea/translate/' + id + '/delete');
  }


}
