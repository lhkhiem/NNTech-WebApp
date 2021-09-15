import { Component, OnInit, TemplateRef } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { equalPassword } from 'src/app/core/helpers/Validation';
import { NotifyService } from 'src/app/core/services/notify.service';
import {ConfirmationService, PrimeNGConfig, MessageService} from 'primeng/api';
import {Message} from 'primeng/api';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [ConfirmationService]
})

export class UserComponent implements OnInit {
  //Các biến cho phân trang
  public pageIndex: number = 1;
  public pageSize: number = 20;
  public pageDisplay: number = 10;
  public totalRow: number | any;
  public keywork: string = '';

  //Entity
  public id: any | null;
  public entity: any = {};

  //Các biến cho hiển thị ra html
  public users: any[] = [];
  public add: boolean = true;

  //Các biến cho lấy danh sách role
  public roles: any = [];
  public selectedRoles: any = [];

  //Các biến cho modal
  modalRef?: BsModalRef;

  //Giới tính
  checked: boolean = false;

  //Khai báo form User
  public fUser: any;

  constructor(
    private dataService: DataService,
    private modalService: BsModalService,
    private notify: NotifyService,
    private confirmationService: ConfirmationService, 
    private primengConfig: PrimeNGConfig
  ) { }
  ngOnInit(): void {
    this.primengConfig.ripple = true;
    //Khai báo form được map từ html
    this.fUser = new FormGroup({
      'fullName': new FormControl('Lê Hoàng Khiêm', Validators.required),
      'email': new FormControl('abc@gmail.com',
        [
          Validators.required,
          Validators.email
        ]),
      'phoneNumber': new FormControl('099999999',
        [
          Validators.required,
          Validators.pattern(/^[0-9]\d*$/)
        ]),
      'dob': new FormControl(new Date, Validators.required),
      'sex': new FormControl(true),
      'userName': new FormControl('admin'),
      // [
      //   Validators.required,
      //   Validators.minLength(4)
      // ]),
      'password': new FormControl('Abcd@1234'),
      // [
      //   Validators.required,
      //   Validators.minLength(6),
      //   Validators.pattern('(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:\{\\\}\\\[\\\]\\\|\\\+\\\-\\\=\\\_\\\)\\\(\\\)\\\`\\\/\\\\\\]])[A-Za-z0-9\d$@].{7,}')
      // ]),
      'confirmPassword': new FormControl('Abcd@1234'),
      // [
      //   Validators.required,
      // ]),
      //'role': new FormControl(null, Validators.required),

    }, {
      validators: equalPassword
    });
    this.loadData();
    this.loadRoles();
  }

  //Phương thức lấy giá trị từ form

  get fullName() {
    return this.fUser.get('fullName');
  }
  get email() {
    return this.fUser.get('email');
  }
  get phoneNumber() {
    return this.fUser.get('phoneNumber');
  }
  get dob() {
    return this.fUser.get('dob');
  }
  get sex() {
    return this.fUser.get('sex');
  }
  get userName() {
    return this.fUser.get('userName');
  }
  get password() {
    return this.fUser.get('password');
  }
  get confirmPassword() {
    return this.fUser.get('confirmPassword');
  }
  // get role() {
  //   return this.fUser.get('role');
  // }

  //Phương thức thay đổi validate
  changeValidate() {
    if (!this.add) {
      this.userName.clearValidators();
      this.password.clearValidators();
      this.confirmPassword.clearValidators();
    }
    else {
      this.userName.setValidators(
        [
          Validators.required,
          Validators.minLength(4)
        ]);
      this.password.setValidators(
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern('(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:\{\\\}\\\[\\\]\\\|\\\+\\\-\\\=\\\_\\\)\\\(\\\)\\\`\\\/\\\\\\]])[A-Za-z0-9\d$@].{7,}')
        ]);
      this.confirmPassword.setValidators(
        [
          Validators.required,
        ]);
    }
  }

  //Các phương thức xử lý
  openAddModal(crudModal: TemplateRef<any>) {
    this.add = true;
    this.id = null;
    this.changeValidate();
    this.modalRef = this.modalService.show(crudModal, { id: 1, class: 'modal-md' });
  }
  openEditModal(idEdit: any, crudModal: TemplateRef<any>) {
    this.add = false;
    this.changeValidate();
    this.modalRef = this.modalService.show(crudModal, { id: 2, class: 'modal-md' });
    this.loadUserDetail(idEdit);
  }
  closeModal() {
    this.modalRef?.hide();
  }

  loadData() {
    this.dataService.get('/api/user/paging?keyword=' + this.keywork + '&pageIndex=' + this.pageIndex + '&pageSize=' + this.pageSize)

      .subscribe((response: any) => {
        this.users = response.resultObj.items;
        this.pageIndex = response.resultObj.pageIndex;
        this.pageSize = response.resultObj.pageSize;
        this.totalRow = response.resultObj.totalRows;
      });
  }
  loadUserDetail(id: any) {
    this.dataService.get('/api/User/' + id)
      .subscribe((response: any) => {
        this.entity = response.resultObj;
        this.id = this.entity.id;
        this.fUser.patchValue({
          fullName: this.entity.fullName,
          email: this.entity.email,
          dob: new Date(this.entity.dob),
          phoneNumber: this.entity.phoneNumber,
          sex: this.entity.sex

        });
      });
  }
  loadRoles() {
    this.dataService.get('/api/Role').subscribe((response: any) => {
      this.roles = response.resultObj;
      //console.log({roles:this.roles});
    });

  }
  
  msgs: Message[] = [];
  deleteItem(id:any) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
          //this.msgs = [{severity:'info', summary:'Confirmed', detail:'Record deleted'}];
      },
      reject: () => {
          //this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
      },
      key:'dl1'
  });
}
  private saveData() {
    if (this.id == undefined || null) {
      this.dataService.post('/api/User/register', JSON.stringify(this.entity))
        .subscribe((response: any) => {
          this.loadData();
          this.closeModal();
          this.fUser.reset();
          this.notify.printSuccess(response.message);
          //console.log(response)
        });
    }
    else {
      this.dataService.put('/api/User/' + this.id, JSON.stringify(this.entity))
        .subscribe((response: any) => {
          this.loadData();
          this.closeModal();
          this.fUser.reset();
          this.notify.printSuccess(response.message);
          console.log('Editting')
        });
    }
  }
  formSubmit() {
    this.entity = this.fUser.value;
    //console.log("formValid", this.fUser.valid, { seletedRoles: this.role.value });
    //this.role=this.
    console.log(this.id)
    console.log(this.entity)
    this.saveData();
  }
}
