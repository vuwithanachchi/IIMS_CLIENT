import {Component, OnInit, ViewChild} from '@angular/core';
import {Filter} from "../../core/models/Filter";
import {componentDTO} from "../dto/componentDTO";
import {MatTableDataSource} from "@angular/material/table";
import {debounceTime, distinctUntilChanged, Observable, Subject, Subscription, timeout} from "rxjs";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {CommonService} from "../services/common.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {SystemConfig} from "../../core/util/SystemConfig";
import {ItemDetailsComponent} from "../m-products/components/item-details/item-details.component";
import {CartDetailsComponent} from "./componenets/cart-details/cart-details.component";

@Component({
  selector: 'app-m-cart',
  templateUrl: './m-cart.component.html',
  styleUrls: ['./m-cart.component.scss']
})
export class MCartComponent implements OnInit {

  filters: Filter[] = [{key: 'ALL', value: 'All'}, {key: 'NAME', value: 'Name'}, {key: 'DESC', value: 'Desc'}, {key: 'URL', value: 'Url'}, {
    key: 'QTY', value: 'qty'},{key: 'PRICE', value: 'Price'},{key: 'CODE', value: 'Code'}];
  components!: Array<componentDTO>[];
  displayedColumns: string[] = ['componetName', 'componetDesc', 'imageURL', 'qty', 'unitPrice', 'componetCode', 'action'];
  dataSource!: MatTableDataSource<Array<componentDTO>>;
  private allComponentsSub!: Subscription;
  private searchComponentsSub!: Subscription;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  tempPageEvent!: PageEvent;
  filterDetailsForm!: FormGroup;
  search = new Subject();
  searchedWords!: string[];
  pageSizeOptions!: number[];
  pageCount = 0;
  loader = true;
  itemDetails!: any[];
  progressbar = true;
  idLoading = true;
  city: any;
  apiResponse!: false;
  itemDetailsForm!: FormGroup;
  brand: any;
  selectedFiles?: FileList;
  fileInfos?: Observable<any>;
  fileObj:any
  loading = false;
  loadings= true;
  imageInfos?: Observable<any>;
  fileDatas!: File;
  previewUrl!: null;
  fileUploadProgress!: string ;
  uploadedFilePath!: string ;
  message: string[] = [];
  progressInfos: any[] = [];
  previews: string[] = [];

  constructor(private http: HttpClient,
              private itemsservice: CommonService,
              public dialog: MatDialog,
  ) {
    // this.dataSource = new MatTableDataSource(this.components);
    // this.pageSizeOptions = SystemConfig.getPageSizes();
  }

  ngOnInit(): void {

    this.filterDetailsForm = new FormGroup({
      searchKeyWord: new FormControl('', [
        Validators.required
      ]),
      filter:new FormControl('ALL'),
      stateFilter:new FormControl('ACTIVATED')
    });
    this.search.pipe(
      debounceTime(SystemConfig.getDebounceTime()),
      distinctUntilChanged())
      .subscribe(() => {
        this.searchedWords = this.filterDetailsForm.get('searchKeyWord')?.value.trim().split(' ');
        this.refreshTable();

      });

  }

  ngAfterViewInit(): void {
    this.refreshTable();
  }

  public refreshPageCount(): void {
    if (this.paginator){
      console.log('refresh page count');
      this.pageCount = Math.ceil(this.paginator.length / this.paginator.pageSize);
      console.log('refresh page count after');
    }
  }

  pageNavigate(value: string): void {
    this.paginator.pageIndex = Number(value) - 1;
    this.paginator.page.next({
      pageIndex: this.paginator.pageIndex,
      pageSize: this.paginator.pageSize,
      length: this.paginator.length
    });
  }

  Test($event: KeyboardEvent): void {
    console.log($event);
  }

  public refreshTable(): void {
    const searchKeyWord = this.filterDetailsForm.get('searchKeyWord')?.value;
    this.loadTable(String(this.paginator.pageIndex), String(this.paginator.pageSize));
    this.searchTable(searchKeyWord)
  }


  public loadTable(pageIndex: string, pageSize: string): void {
    this.allComponentsSub = this.itemsservice.getCart()
      .subscribe(result => {
        console.log("search items")
        console.log(result)
        this.paginator.length = result.length;
        this.dataSource = result;
        this.itemDetails =result;
        this.refreshPageCount();
      }, error => {
        console.log(error);
      });
  }

  searchTable(searchKeyWord: string): void {
    if (searchKeyWord!=='') {
      this.searchComponentsSub = this.itemsservice.searchComponent(searchKeyWord)
        .pipe(timeout(4000))
        .subscribe(result => {
          this.loader = false;
          console.log(result.data.data)
          this.paginator.length = result.data.data.length;
          this.dataSource = result.data.data;
          this.itemDetails = result.data.data;
          this.refreshPageCount();
        }, error => {
          console.log(error);
        });
    }else {
      console.log("not search")
    }
  }

  viewDetails(itemId:any): void {
    this.itemsservice.getItemDetails(itemId).subscribe(res => {
      console.log(res)
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.data = res;
      console.log('----------------------------');
      const dialogRef = this.dialog.open(CartDetailsComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(result => {
        this.loader = false;
        console.log("response code1")
        console.log(result)
        console.log("response code2")
        this.refreshTable();
      });

    })
  }



  updateCustomer(row: any): void {
    // const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = true;
    // dialogConfig.autoFocus = true;
    // dialogConfig.data = row;
    // dialogConfig.width = '100%';
    // dialogConfig.height = '95%';
    // console.log(row);
    // console.log('----------------------------');
    // const dialogRef = this.dialog.open(UpdateItemsComponent, dialogConfig);
    // dialogRef.afterClosed().subscribe(result => {
    //   this.loader = false;
    //   console.log("response code1")
    //   console.log(result)
    //   console.log("response code2")
    //   this.refreshTable();
    // });
  }

  deleteCustomer(row: any): void {
    // const approval = this.dialog.open(ApprovelDialogComponent, {
    //   width: '350px',
    //   data: new ApprovalDialogConfig('Delete', 'Warning !', 'Are you sure you want to delete '+row.componetName+' Item?')
    // });
    // approval.afterClosed().subscribe(approve => {
    //   if (approve) {
    //     this.loader = false;
    //     console.log(approve)
    //     this.itemsservice.deleteComponent(row.componetID).subscribe(res => {
    //       console.log(res);
    //       this.refreshTable();
    //     });
    //
    //   }else{
    //     const approval4 = this.dialog.open(ApprovelDialogComponent, {
    //       width: '350px',
    //       data: new ApprovalDialogConfig('Error', 'UnSuccessful', 'Item '+row.componetName+' Is Not Deleted')
    //     });
    //     approval4.afterClosed().subscribe(approve => {
    //       if (approve) {
    //         this.loader = false;
    //         this.refreshTable();
    //
    //       }
    //     })
    //   }
    // });
  }




  public getServerData(event: PageEvent): any {
    const searchKeyWord = this.filterDetailsForm.get('searchKeyWord')?.value;
    this.loadTable(String(event.pageIndex), String(event.pageSize));
    this.searchTable(searchKeyWord)
  }


}
