import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenService } from '../core/services/authen.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public model:any={};
  public user:any={};
  constructor(
    private authenService: AuthenService,
    private router:Router
  ) {}

  ngOnInit(): void {
  }
  login(f:NgForm):void{
    this.authenService.login(this.model.user, this.model.password)
    .subscribe((data:any)=>{
      this.user=data;
    })
    console.log(this.user);
  }

}
