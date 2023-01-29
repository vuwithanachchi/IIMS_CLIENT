import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {ApprovalDialogComponent} from "../dialogs/approval-dialog/approval-dialog.component";
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {

  loginDetailsForm!: FormGroup;

  apiResponse=false;
  constructor(private formBuilder:FormBuilder,
              private authService:AuthService,
              private router: Router,
              private dialog:MatDialog
  ) { }

  ngOnInit(): void {
    this.loginDetailsForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  loginUser():void{
    this.authService.login(this.loginDetailsForm.get('username')?.value)
      .subscribe(res => {
        console.log()
        if (res[0].password == this.loginDetailsForm.get('password')?.value) {
          // this.cookieService.put('token',JSON.stringify(res[0].token),{ expires: new Date(new Date().getTime() +  24000 * 60 * 60) });
          this.router.navigate(['/dashboard']);
          // login= true;
        }else{
          console.log("res")
          console.log(res)
          // const approval5 = this.dialog.open(ApprovelDialogComponent, {
          //   width: '450px',
          //   data: new ApprovalDialogConfig('Error', 'UnSuccessful', 'Invalid Username Or Password')
          // });
          // approval5.afterClosed().subscribe(approve => {
          //   if (approve) {
          //     console.log('Login Unsuccessful');
          //   }else{
          //     console.log('Login successful');
          //   }
          // });
        }
      })
  }
  clear(){
    this.loginDetailsForm.reset();
  }

}
