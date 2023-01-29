import {Component, OnInit, ViewChild} from '@angular/core';
import {CookieService} from "ngx-cookie";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {map, Observable, startWith, Subject, Subscription} from "rxjs";
import {MatSort} from "@angular/material/sort";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {CommonService} from "../services/common.service";
import {FoodDTO} from "../dto/foodDTO";

@Component({
  selector: 'app-m-orders',
  templateUrl: './m-orders.component.html',
  styleUrls: ['./m-orders.component.scss']
})
export class MOrdersComponent implements OnInit {

  complaintDetailsForm!: FormGroup;
  apiResponse: any;
  today:any
  filterComplaintsForm!: FormGroup;
  dataSource!: MatTableDataSource<Array<FoodDTO>>;
  displayedColumns: string[] = ['orderid', 'orderdate', 'orderamount','orderstatus','sippingaddress','paymentmethod','paymentstatus'];
  pageCount = 0;
  pageSizeOptions!: number[];
  tempPageEvent!: PageEvent;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  search = new Subject();
  private allItemSub!: Subscription;
  userdetail:any

  myControl = new FormControl('');
  options: string[] = ['Available', 'Unavailable'];
  filteredOptions!: Observable<string[]>;

  constructor(private complaintService: CommonService,private dialog: MatDialog,
              private cookieService: CookieService) { }

  ngOnInit(): void {

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );

    this.refreshTable();

  }

  ngAfterViewInit(): void {
    this.refreshTable();
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  Test($event: KeyboardEvent) {

  }


  saveComplaint() {
    // this.userdetail = JSON.parse(<string>this.cookieService.get('VArr'))
    // this.complaintService.saveaFood(new FoodDTO(
    //   "",
    //   this.complaintDetailsForm.get('fname')?.value,
    //   this.complaintDetailsForm.get('fdesc')?.value,
    //   "",
    //   new Date().toISOString().slice(0, 10),
    //   this.complaintDetailsForm.get('address')?.value,
    //   this.complaintDetailsForm.get('status')?.value,
    //   this.userdetail[0].dname,
    //   this.userdetail[0].dphoneNo1,
    // )).subscribe(result => {
    //   console.log("Food Successfully Added")
    //   // this.toastrService.success('Food Item Added Successfully!', 'Success!');
    //   console.log(result)
    //   this.loadTable();
    //   this.resetfields();
    //
    // }, error => {
    //   console.log(error);
    // });
  }

  resetfields(){
    // this.complaintDetailsForm.setValue({
    //   fname:'',
    //   fdesc:'',
    //   address :'',
    //   status :''
    // })
  }

  refreshTable(): void {
    this.loadTable();
  }

  updateComplaint(row:any) {
    // const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = true;
    // dialogConfig.autoFocus = true;
    // dialogConfig.data = row;
    // dialogConfig.width = '55%';
    // dialogConfig.height = '55%';
    // console.log(row);
    // console.log('----------------------------');
    // const dialogRef = this.dialog.open(UpdateFoodComponent, dialogConfig);
    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(result);
    //   this.refreshTable();
    // });
  }

  deleteComplaint(row:any) {
    // this.complaintService.deleteaFood(row.cid).subscribe(result => {
    //   console.log("Complaint Successfully deleted")
    //   this.toastrService.error('Invalid Credentials!', 'Warning!');
    //   console.log(result)
    //   this.loadTable();
    // }, error => {
    //   console.log(error);
    // });
  }

  private loadTable(): void {
    this.allItemSub = this.complaintService.getAllOrders()
      .subscribe(result => {
        console.log("result")
        console.log(result)
        this.paginator.length = result.length;
        this.dataSource = result;
        // console.log(result.data);
      }, error => {
        console.log(error);
      });
  }

  pageNavigate(value: string): void {
    this.paginator.pageIndex = Number(value) - 1;
    this.paginator.page.next({
      pageIndex: this.paginator.pageIndex,
      pageSize: this.paginator.pageSize,
      length: this.paginator.length
    });
  }

  getServerData($event: PageEvent): any {

  }
}
