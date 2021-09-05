import { Component, OnInit } from '@angular/core';

import { NotifyService } from 'src/app/core/services/notify.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private notify: NotifyService ) { 
  }

  ngOnInit(): void {
  }
  showSuccess() {
    this.notify.notifyError('Hello world!', 'Toastr fun!');
  }
  public addNew():any{
    this.showSuccess();
  }
}
