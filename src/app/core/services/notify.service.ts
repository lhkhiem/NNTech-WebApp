import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {
  private options = {
    positionClass: 'toast-top-right',
    closeButton: true,
    progressBar: true,
    timeOut: 2000,
  };
  constructor(
    private toastr: ToastrService,
  ) {}
  
  public printSuccess(message: string, title?: string) {
    this.toastr.success(message, title, this.options)
  }
  public printError(message: string, title?: string) {
    this.toastr.error(message, title, this.options)
  }
}
