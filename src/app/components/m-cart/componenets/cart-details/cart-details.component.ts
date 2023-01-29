import {Component, Inject, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {CommonService} from "../../../services/common.service";
import {CartDTO} from "../../../dto/cartDTO";
import {ApprovalDialogComponent} from "../../../../core/dialogs/approval-dialog/approval-dialog.component";
import {ApprovalDialogConfig} from "../../../../core/dialogs/approval-dialog/model/ApprovalDialogConfig";
import {OrderDTO} from "../../../dto/orderDTO";

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.scss']
})
export class CartDetailsComponent implements OnInit {

  idLoading = true;
  apiResponse!: false;
  ItemDetailFrom!: FormGroup;
  checked = false;
  disabled = false;
  fileObj:any
  itemname!:any;
  itemdesc!:any;
  itemimg!:any;
  itemqty!:any;
  itemprice!:any;


  constructor(private http: HttpClient,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dialog: MatDialog,
              public dialogRef: MatDialogRef<CartDetailsComponent>,private itemsservice: CommonService) { }

  ngOnInit(): void {
    console.log(this.data);
    this.itemname = this.data[0].componetName;
    this.itemdesc = this.data[0].componetDesc;
    this.itemimg = this.data[0].imageURL;
    this.itemqty = this.data[0].qty;
    this.itemprice = this.data[0].unitPrice;


    // componetCode: "B0s01a"
    // componetDesc: "first componet"
    // componetID: 25
    // componetName: "IC001"
    // createtime: "2022-03-18T08:39:10.000Z"
    // imageURL: "42198673.png"
    // lastupdatetime: "2022-04-06T14:22:45.000Z"
    // qty: "23"
    // unitPrice: "234"
  }

  onNoClick(): void {
    this.dialogRef.close();

  }



  BuyProduct() {
    const approval = this.dialog.open(ApprovalDialogComponent, {
      width: '350px',
      data: new ApprovalDialogConfig('Delete', 'Warning !', 'Are you sure you want to buy this Item?')
    });
    approval.afterClosed().subscribe(approve => {
      if (approve) {
        this.itemsservice.BuyProducts(new OrderDTO(
          "",
          "user",
          new Date().toISOString().slice(0, 10),
          this.data[0].qty,
          "PENDING",
          "COLOMBO",
          "CASH",
          "ON GOING"
        )).subscribe(res=>{
          console.log(res)
          if (res){
            console.log("sucess")
            const approval5 = this.dialog.open(ApprovalDialogComponent, {
              width: '350px',
              data: new ApprovalDialogConfig('Alert', 'Successfully', 'Item Ordered Successfully')
            });
            approval5.afterClosed().subscribe(approve => {
              if (approve) {
                console.log('Item Ordered Successfully');
                // this.itemDetailsForm.reset();
                // this.refreshTable();
              }
            });
          }else{
            console.log("Nop")
            const approval4 = this.dialog.open(ApprovalDialogComponent, {
              width: '350px',
              data: new ApprovalDialogConfig('Error', 'UnSuccessful', 'Item Order Unsuccessful')
            });
            approval4.afterClosed().subscribe(approve => {
              if (approve) {
                console.log('Item Order Unsuccessful');
              }
            });
          }
        });

      }else{
        const approval4 = this.dialog.open(ApprovalDialogComponent, {
          width: '350px',
          data: new ApprovalDialogConfig('Error', 'UnSuccessful', 'Item  Is Not bought')
        });
        approval4.afterClosed().subscribe(approve => {
          if (approve) {
            // this.loader = false;
            // this.refreshTable();

          }
        })
      }
    });




    // this.itemsservice.BuyProducts(new OrderDTO(
    //   "",
    //   "user",
    //   new Date().toISOString().slice(0, 10),
    //   this.data[0].qty,
    //   "PENDING",
    //   "COLOMBO",
    //   "CASH"
    // )).subscribe(res=>{
    //   console.log(res)
    //   if (res){
    //     console.log("sucess")
    //     const approval5 = this.dialog.open(ApprovalDialogComponent, {
    //       width: '350px',
    //       data: new ApprovalDialogConfig('Alert', 'Successfully', 'Item Added Successfully')
    //     });
    //     approval5.afterClosed().subscribe(approve => {
    //       if (approve) {
    //         console.log('Item Added Successfully');
    //         // this.itemDetailsForm.reset();
    //         // this.refreshTable();
    //       }
    //     });
    //   }else{
    //     console.log("Nop")
    //     const approval4 = this.dialog.open(ApprovalDialogComponent, {
    //       width: '350px',
    //       data: new ApprovalDialogConfig('Error', 'UnSuccessful', 'Item Add Unsuccessful')
    //     });
    //     approval4.afterClosed().subscribe(approve => {
    //       if (approve) {
    //         console.log('Item Add Unsuccessful');
    //       }
    //     });
    //   }
    // });
  }

}
