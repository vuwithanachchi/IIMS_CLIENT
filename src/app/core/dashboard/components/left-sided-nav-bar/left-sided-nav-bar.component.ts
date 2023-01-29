import {Component, Input, OnInit} from '@angular/core';
import {UserData} from "../../../../../assets/Nav";
import {NavDTO} from "./dto/NavDTO";

@Component({
  selector: 'app-left-sided-nav-bar',
  templateUrl: './left-sided-nav-bar.component.html',
  styleUrls: ['./left-sided-nav-bar.component.scss']
})
export class LeftSidedNavBarComponent implements OnInit {

  @Input() navState = true;
  userMenus: NavDTO [] = UserData;
  showUserMenu= true;

  constructor() {

  }

  ngOnInit(): void {
  }

  loadMenus(){

  }

}
