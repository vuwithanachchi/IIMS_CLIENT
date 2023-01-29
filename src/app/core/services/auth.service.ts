import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {map, Observable} from "rxjs";
import {environment} from "../../../environments/environment";

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
}
