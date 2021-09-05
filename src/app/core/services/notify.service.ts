import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class NotifyService {
  private options = {
    positionClass: 'toast-top-right',
    closeButton: true,
    progressBar: true
  };
  constructor(private toastr: ToastrService) { }

  public notifySuccess(title: string, message: string) {
    this.toastr.success(title, message, this.options)
  }
  public notifyError(title: string, message: string) {
    this.toastr.error(title, message, this.options)
  }
}
