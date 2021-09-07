import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  public pageIndex: number = 1;
  public pageSize: number = 10;
  public pageDisplay: number = 10;
  public totalRow: number|any;
  public keywork: string = '';
  public users: any[]=[];
  constructor(private _dataService: DataService,) { }

  ngOnInit(): void {
    this.loadData()
  }
  loadData() {
    this._dataService.get('/api/user/paging?keyword=' + this.keywork + '&pageIndex=' + this.pageIndex + '&pageSize=' + this.pageSize)

      .subscribe((response: any) => {
        this.users = response.resultObj.items;
        this.pageIndex = response.resultObj.pageIndex;
        this.pageSize = response.resultObj.pageSize;
        this.totalRow = response.resultObj.totalRows;
        console.log(this.users);
        console.log(this.pageIndex, this.pageSize);
      });
      
  }
}
