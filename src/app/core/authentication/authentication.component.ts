import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {ApprovalDialogComponent} from "../dialogs/approval-dialog/approval-dialog.component";
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";
import {ApprovalDialogConfig} from "../dialogs/approval-dialog/model/ApprovalDialogConfig";
import {UserDTO} from "./dto/userDTO";

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {

  farmerForm!: FormGroup;
  LoginForm!:FormGroup;
  showAnime= false;

  constructor(private router: Router,
              private _snackBar: MatSnackBar,
              private authenticationService:AuthService,
              public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.farmerForm = new FormGroup({
      username: new FormControl('', [
        Validators.required
      ]),
      password: new FormControl('', [
        Validators.required
      ]),
    });
    this.LoginForm = new FormGroup({
      username: new FormControl('', [
        Validators.required
      ]),
      email: new FormControl('', [
        Validators.required
      ]),
      phoneNo1: new FormControl('', [
        Validators.required
      ]),
      password: new FormControl('', [
        Validators.required
      ]),
    })
  }

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  openSnackBar() {
    this._snackBar.open('Wrong Credentials', 'Ok', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: ['red-snackbar','login-snackbar']
    });
  }

  signIn() {
    this.showAnime = true
    if (this.farmerForm.valid){
      this.authenticationService.login(this.farmerForm.get('username')?.value)
        .subscribe((res:any) => {
          console.log(res)
          if (res[0].password == this.farmerForm.get('password')?.value) {

            this.router.navigate(['/dashboard']);
          }},error => {
          console.log(error)
          this.dialog.open(ApprovalDialogComponent, {
            width: '350px',
            // height: '200px',
            data: new ApprovalDialogConfig('Error', 'Wrong Credentials!', 'Invalid Username Or Password')
          });
        });
    }else {
      this.dialog.open(ApprovalDialogComponent, {
        width: '350px',
        data: new ApprovalDialogConfig('Error', 'Error!', 'Please Insert All Values Correctly')
      });
    }
  }

  addUser(){
    this.showAnime = true
    if (this.LoginForm.valid){
      this.authenticationService.AddnewUser(new UserDTO(
        "",
        this.LoginForm.get('username')?.value,
        this.LoginForm.get('email')?.value,
        this.LoginForm.get('password')?.value
      )).subscribe(res=>{
        console.log(res)
        if (res){
          this.openSnackBars()
          this.clearform();
        }},error => {
        console.log(error)
        this.dialog.open(ApprovalDialogComponent, {
          width: '350px',
          data: new ApprovalDialogConfig('Error', 'Error!', 'Invalid Inputs Or Already registred')
        });
      });
    }else {
      this.dialog.open(ApprovalDialogComponent, {
        width: '350px',
        data: new ApprovalDialogConfig('Error', 'Error!', 'Please Insert All Values Correctly')
      });
    }

  }

  clearform(){
    this.LoginForm.setValue({
      password:'',
      username:'',
      phoneNo1 :'',
      email:'',
    })
  }


  openSnackBars(){
    this._snackBar.open('User Added Successful!!', 'ok',{
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: ['green-snackbar', 'login-snackbar']
    });
  }

}
