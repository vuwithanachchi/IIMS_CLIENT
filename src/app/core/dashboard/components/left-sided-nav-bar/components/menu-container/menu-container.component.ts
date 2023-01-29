import {Component, Input, OnInit} from '@angular/core';
import {NavDTO} from "../../dto/NavDTO";

@Component({
  selector: 'app-menu-container',
  templateUrl: './menu-container.component.html',
  styleUrls: ['./menu-container.component.scss']
})
export class MenuContainerComponent implements OnInit {

  @Input() Menus!: NavDTO[] | undefined;
  constructor() {
    console.log(this.Menus);
  }

  ngOnInit(): void {
    console.log(this.Menus);

  }
  isMultiLevel(menu:NavDTO):boolean{
    if (!!menu.list){
      return menu.list.length > 0;
    }
    return false;
  }

}
