import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorHandlerService {
  constructor(private toastr: ToastrService) {}

  HandleResponseErrors(err: HttpErrorResponse): any {
    switch (err.status) {
      case 500:
      case 400:
      case 403:
      case 404:
      case 406: {
        if (typeof err.error.message !== 'undefined') {
          this.toastr.error(err.error.message);
        }
        return err.error;
      }
      case 422: {
        if (typeof err.error.message !== 'undefined') {
          this.toastr.error(err.error.message);
        }
        return err.error?.errors;
      }
      case 401: {
        // window.location.href = './#/login';
        return err.error;
      }
      case 504: {
        this.toastr.error(err.error);
        return err;
      }
      default:
        this.toastr.error(err.message, err.statusText);
        return {};
    }
  }
}
