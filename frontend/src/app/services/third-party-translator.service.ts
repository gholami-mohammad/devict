import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GoogleTranslateResponse } from '../components/google-translator/google-translate-model';

@Injectable({
  providedIn: 'root'
})
export class ThirdPartyTranslatorService {

  constructor(private http: HttpClient) { }

  translate(text: string, service: string) {
    return this.http.get<GoogleTranslateResponse>(`/api/third-party-translator/${service}`, {
      params: new HttpParams().append('text', text),
    })
  }
}
