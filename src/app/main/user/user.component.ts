import { Component, OnInit, TemplateRef } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormControl, Validators, FormGroup, NgForm } from '@angular/forms';
import { equalPassword } from 'src/app/core/helpers/Validation';
import { NotifyService } from 'src/app/core/services/notify.service';
import { ConfirmationService } from 'primeng/api';
interface Roles {
  name: string,
  selected: boolean
}
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [ConfirmationService]
})

export class UserComponent implements OnInit {
  public loading: boolean = true;
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
  public convertRoles: Roles[] = [];
  public selectedRoles: Roles[] = [];

  //Các biến cho modal
  modalRef?: BsModalRef;

  //Giới tính
  checked: boolean = false;

  //Khai báo form User
  public fUser: any;
  public fRole: any;

  constructor(
    private dataService: DataService,
    private modalService: BsModalService,
    private notify: NotifyService,
    private confirmationService: ConfirmationService,
  ) { }
  ngOnInit(): void {
    //Khai báo form được map từ html
    this.fUser = new FormGroup({
      'fullName': new FormControl('Lê Hoàng Khiêm', Validators.required),
      'email': new FormControl('abc@gmail.com',
        [
          Validators.required,
          Validators.email,
          Validators.pattern(/^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$/)
        ]),
      'phoneNumber': new FormControl('099999999',
        [
          Validators.required,
          Validators.pattern(/^[0-9]\d*$/)
        ]),
      'dob': new FormControl(new Date, Validators.required),
      'sex': new FormControl(true),
      'userName': new FormControl('admin'),

      'password': new FormControl('Abcd@1234'),
      'confirmPassword': new FormControl('Abcd@1234'),
    }, {
      validators: equalPassword
    });
    this.loadData();
    this.loadAllRoles();
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
  openRoleModal(idEdit: any, roleModal: TemplateRef<any>) {
    this.add = false;
    this.id = idEdit;
    this.modalRef = this.modalService.show(roleModal, { id: 3, class: 'modal-md' });
    this.selectedRoles = [];
    this.loadRoles(idEdit);


    //console.log(idEdit);
  }
  closeModal() {
    this.modalRef?.hide();

  }

  loadData() {
    this.loading = true;
    this.dataService.get('/api/user/paging?keyword=' + this.keywork + '&pageIndex=' + this.pageIndex + '&pageSize=' + this.pageSize)

      .subscribe((response: any) => {
        this.users = response.resultObj.items;
        this.pageIndex = response.resultObj.pageIndex;
        this.pageSize = response.resultObj.pageSize;
        this.totalRow = response.resultObj.totalRows;
        this.loading = false;
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
  loadAllRoles() {
    this.dataService.get('/api/Role').subscribe((response: any) => {
      this.roles = response.resultObj;
    });
  }
  loadRoles(userId: string) {
    this.dataService.get('/api/user/allroles/' + userId).subscribe((response: any) => {
      let userRoles = response.resultObj;
      let temp: Roles[] = [];
      this.roles.forEach((element: any) => {
        let selected = false;
        if (userRoles.indexOf(element.name) == -1)
          selected = false;
        else
          selected = true;

        let item = {
          name: element.name,
          selected: selected
        }

        temp.push(item);

      });
      this.convertRoles = temp;
      this.selectedRoles = this.convertRoles.filter((x) => x.selected == true);
    });
  }
  //Confirm dialog
  deleteItem(id: string) {
    this.confirmationService.confirm({
      message: 'Có chắc muốn xóa không?',
      header: 'Thông báo',
      icon: 'pi pi-info-circle',
      acceptLabel: 'Đồng ý',
      rejectLabel: 'Hủy',
      accept: () => {
        //console.log('đồng ý');
        this.dataService.delete('/api/User/' + id)
          .subscribe((response: any) => {
            if (response.isSuccessed) {
              this.notify.printSuccess("Đã xóa thành công.");
              this.loadData();
            }
            else
              this.notify.printError("Xóa không thành công.");
          });

      },
      reject: () => {
        //console.log('Hủy');
        //this.notify.printError("Đã hủy chức năng xóa.");
      },
      key: 'dl1'
    });
  }
  private saveData() {
    if (this.id == undefined || null) {
      this.dataService.post('/api/User/register', JSON.stringify(this.entity))
        .subscribe((response: any) => {
          this.closeModal();
          this.loadData();
          this.notify.printSuccess(response.message);
          this.fUser.reset();
          //console.log(response)
        });
    }
    else {
      this.dataService.put('/api/User/' + this.id, JSON.stringify(this.entity))
        .subscribe((response: any) => {
          this.closeModal();
          this.loadData();
          this.notify.printSuccess(response.message);
          this.fUser.reset();
        });
    }
  }
  formSubmit() {
    this.entity = this.fUser.value;
    this.saveData();
  }
  fRoleSubmit() {
    let roles = JSON.stringify({ roles: this.convertRoles });
    this.dataService.put('/api/user/' + this.id + '/roles', roles)
      .subscribe((response: any) => {
        if (response.isSuccessed) {
          this.notify.printSuccess(response.message);
        }
        else {
          this.notify.printError("Lỗi kêt nối máy chủ.");
        }
      })
    this.modalRef?.hide();
  }
  onCheckboxChange(checked: any, item: Roles) {
    let index = this.convertRoles.findIndex(x => x.name === item.name);
    if (index != -1) {
      this.convertRoles[index].selected = checked.checked;
    }
    else {
      this.convertRoles.push(
        {
          name: item.name,
          selected: checked.checked
        }
      );
    }
  }
}
