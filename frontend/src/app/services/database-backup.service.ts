import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DatabaseBackup } from '../models/database-backup';
import { MessageResponse } from '../models/response-models';

@Injectable({
  providedIn: 'root'
})
export class DatabaseBackupService {

  constructor(private http: HttpClient) { }

  index() {
    return this.http.get<DatabaseBackup[]>('/api/database-backups');
  }

  takeBackup() {
    const path = `/api/database-backups/take`;
    return this.http.get<MessageResponse>(path);
  }

  delete(name: string) {
    const path = `/api/database-backups/${name}`;
    return this.http.delete<MessageResponse>(path);
  }

  download(name: string) {
    const path = `/api/database-backups/${name}`;
    return this.http.get(path, {
      responseType: 'arraybuffer',
      reportProgress: true,
      observe: 'events',
    });
  }
}
