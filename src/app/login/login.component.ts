import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SystemConstants } from '../core/common/system.constants';
import { UrlConstants } from '../core/common/url.constants';
import { AuthenService } from '../core/services/authen.service';
import { NotifyService } from '../core/services/notify.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public model: any = {};
  public user: any = {};
  public fLogin: any;
  constructor(
    private authenService: AuthenService,
    private router: Router,
    private notify: NotifyService,

  ) { }

  ngOnInit(): void {
    //Khai báo form được map từ html
    this.fLogin = new FormGroup({
      'username': new FormControl('admin', Validators.required),
      'password': new FormControl('Admin@123',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern('(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:\{\\\}\\\[\\\]\\\|\\\+\\\-\\\=\\\_\\\)\\\(\\\)\\\`\\\/\\\\\\]])[A-Za-z0-9\d$@].{7,}')
        ])
    });
  }
  //Phương thức lấy giá trị từ form
  get username() {
    return this.fLogin.get('username');
  }
  get password() {
    return this.fLogin.get('password');
  }
  //Đăng nhập
  login() {
    this.authenService.login(this.username.value, this.password.value)
      .subscribe(
        (data: any) => {
          if (data.isSuccessed == true) {
            //this.notify.notifySuccess(data.message, '');
            //set token vao localstored
            localStorage.removeItem(SystemConstants.CURRENT_USER);
            localStorage.setItem(SystemConstants.CURRENT_USER, JSON.stringify(data.token));
            //chuyen huong ve home
            this.router.navigate([UrlConstants.HOME]);
          }
          else
            this.notify.notifyError(data.message, '');
        },
        error => {
          this.notify.notifyError('Lỗi kết nối máy chủ', '');
        })

  }

}
