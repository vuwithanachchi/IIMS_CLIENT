import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {map, Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {UserDTO} from "../authentication/dto/userDTO";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  LoginUrl = environment.baseUrl;

  constructor(private http: HttpClient,
              private router: Router,) { }

  login(username: string): Observable<any> {
    return this.http.get(this.LoginUrl+'/user/specuser/'+username, {
      headers:new HttpHeaders({
        'Content-Type':  'application/json',
        // 'Authorization': authorizationData
      })
    });
  }

  AddnewUser(userDTO: UserDTO) : Observable<any> {
    return this.http.post(this.LoginUrl+'/user/saveuser', {
      userid: userDTO.userid,
      username: userDTO.username,
      email: userDTO.email,
      password: userDTO.password,
      headers:new HttpHeaders({
        'Content-Type':  'application/json'
        // 'Authorization': 'Bearer ' + JSON.parse(this.cookieService.get('token')),
      })
    })
  }
}
