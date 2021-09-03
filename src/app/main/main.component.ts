import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit, AfterViewInit {

  constructor(private elementRef: ElementRef) {
  }
  ngAfterViewInit(): void {
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "../../assets/js/demo.js";
    this.elementRef.nativeElement.appendChild(s);
  }
  ngOnInit(): void {
  }

}
