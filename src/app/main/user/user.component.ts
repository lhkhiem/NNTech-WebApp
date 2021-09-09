import { Component, OnInit, TemplateRef } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  public pageIndex: number = 1;
  public pageSize: number = 10;
  public pageDisplay: number = 10;
  public totalRow: number | any;
  public keywork: string = '';
  public users: any[] = [];
  public add: boolean = true;

  modalRef?: BsModalRef;
  constructor(private _dataService: DataService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.loadData()
  }
  openAddModal(template: TemplateRef<any>) {
    this.add=true;
    this.modalRef = this.modalService.show(template, { id: 1, class: 'modal-md' });
  }
  openEditModal(template: TemplateRef<any>) {
    this.add=false;
    this.modalRef = this.modalService.show(template, { id: 1, class: 'modal-md' });
  }
  closeModal(template: TemplateRef<any>){
    this.modalRef?.hide();
  }
  loadData() {
    this._dataService.get('/api/user/paging?keyword=' + this.keywork + '&pageIndex=' + this.pageIndex + '&pageSize=' + this.pageSize)

      .subscribe((response: any) => {
        this.users = response.resultObj.items;
        this.pageIndex = response.resultObj.pageIndex;
        this.pageSize = response.resultObj.pageSize;
        this.totalRow = response.resultObj.totalRows;
      });

  }
}
