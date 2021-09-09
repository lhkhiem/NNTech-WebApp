import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { SystemConstants } from '../core/common/system.constants';
import { UrlConstants } from '../core/common/url.constants';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit, AfterViewInit {

  constructor(private elementRef: ElementRef,private router: Router) {
    
  }
  ngAfterViewInit(): void {
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "../../assets/js/select2.full.min.js";
    this.elementRef.nativeElement.appendChild(s);
  }
  ngOnInit(): void {
  }
  logout(){
    localStorage.removeItem(SystemConstants.CURRENT_USER);
    //chuyen huong ve home
    this.router.navigate([UrlConstants.LOGIN]);
  }

}
