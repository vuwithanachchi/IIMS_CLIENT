import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {

  public isMenuOpen = true;
  @Output() event = new EventEmitter<boolean>();
  user: string | undefined;
  constructor(private authService:AuthService, private router: Router) { }

  ngOnInit(): void {
    // this.user=this.authService.getCurrentUser?.username;
  }

  sendNavState(): void {
    this.isMenuOpen = !this.isMenuOpen;
    this.event.emit(this.isMenuOpen);
  }

  logout() {
    this.router.navigate(['/login']);
  }

}
