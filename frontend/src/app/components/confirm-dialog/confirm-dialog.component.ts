import { Component } from '@angular/core';
import { NgxModalComponent } from 'ngx-modalview';

export class ConfigDialog {
  title? = 'Are you sure?';
  message?: string;
  confirmLabel?: string = "Confirm";
  cancelLabel?: string = "Cancel";
  headerClass?: string = "text-bg-danger";
  confirmBtnClass?: string = "btn-outline-danger";
  cancelBtnClass?: string = "btn-outline-primary";
}

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent extends NgxModalComponent<{config?: ConfigDialog}, boolean> {
  config: ConfigDialog = new ConfigDialog;
  constructor() {
    super();
    this.result = false;
  }

  confirmed() {
    this.result = true;
    this.close();
  }
}
