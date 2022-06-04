import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DatabaseBackup } from 'src/app/models/database-backup';
import { DatabaseBackupService } from 'src/app/services/database-backup.service';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-database-backup-index',
  templateUrl: './database-backup-index.component.html',
  styleUrls: ['./database-backup-index.component.scss']
})
export class DatabaseBackupIndexComponent implements OnInit {

  loading = true;
  backups: DatabaseBackup[] = [];
  progress = 0;

  constructor(private backupService: DatabaseBackupService, private errService: ErrorHandlerService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.index();
  }

  index() {
    return this.backupService.index().subscribe({
      next: res => {
        this.backups = res;
        this.loading = false;
      },
      error: err => {
        this.loading = false;
      },
    });
  }

  take() {
    this.loading = true;
    this.backupService.takeBackup().subscribe({
      next: res => {
        this.toastr.success(res.message);
        this.index();
      },
      error: err => {
        this.errService.HandleResponseErrors(err);
        this.loading = false;
      }
    });
  }

  delete(item: DatabaseBackup) {
    if (!confirm("Are you sure?")) {
      return;
    }
    return this.backupService.delete(item.name).subscribe({
      next: res => {
        this.index();
        this.toastr.success(res.message);
      },
      error: err => {
        this.errService.HandleResponseErrors(err);
        this.loading = false;
      },
    });
  }

  download(item: DatabaseBackup) {
    return this.backupService.download(item.name).subscribe({
      next: (event) => {
        if (event.type === HttpEventType.DownloadProgress) {
          this.progress = Math.round((100 * event.loaded) / (event.total ?? 0));
        } else if (event.type === HttpEventType.Response) {
          setTimeout(() => {
            this.progress = 0;
          }, 3000);

          let contentType = 'application/octet-stream';
          if (event.headers.has('Content-Type')) {
            contentType = event.headers.get('Content-Type') ?? 'application/octet-stream';
          }

          const blob = new Blob([event.body ?? ''], {
            type: contentType,
          });
          saveAs(blob, item.name);
        }
      },
      error: err => {
        this.errService.HandleResponseErrors(err);
        this.loading = false;
      },
    });
  }

}
