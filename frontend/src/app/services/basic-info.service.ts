import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BasicInfoService {

  constructor(private http: HttpClient) { }

  get(items: string[]) {
    return this.http.get<any[]>(`/api/basic_info`, {
      params: new HttpParams().append('items', items.join(',')),
    });
  }
}
