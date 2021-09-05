import { Injectable } from '@angular/core';
declare var alertify: any;
@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private _notifier: any = alertify;
  constructor() { 
    alertify.defaults = {
      // dialogs defaults
      autoReset: true,
      basic: false,
      closable: true,
      closableByDimmer: true,
      frameless: false,
      maintainFocus: true, // <== global default not per instance, applies to all dialogs
      maximizable: true,
      modal: true,
      movable: true,
      moveBounded: false,
      overflow: true,
      padding: true,
      pinnable: true,
      pinned: true,
      preventBodyShift: false, // <== global default not per instance, applies to all dialogs
      resizable: true,
      startMaximized: false,
      transition: 'pulse',

      // notifier defaults
      notifier: {
        // auto-dismiss wait time (in seconds)  
        delay: 5,
        // default position
        position: 'top-right',
        // adds a close button to notifier messages
        closeButton: false
      },

      // language resources 
      glossary: {
        // dialogs default title
        title: 'Xác nhận',
        // ok button text
        ok: 'Đồng ý',
        // cancel button text
        cancel: 'Hủy'
      },

      // theme settings
      theme: {
        // class name attached to prompt dialog input textbox.
        input: 'ajs-input',
        // class name attached to ok button
        ok: 'ajs-ok',
        // class name attached to cancel button 
        cancel: 'ajs-cancel'
      }
    };
  }
  printSuccessMessage(message: string) {

    this._notifier.success(message);
  }

  printErrorMessage(message: string) {
    this._notifier.error(message);
  }

  printConfirmationDialog(message: string, okCallback: () => any) {
    this._notifier.confirm(message, function (e:any) {
      if (e) {
        okCallback();
      } else {
      }
    });
  }
}
