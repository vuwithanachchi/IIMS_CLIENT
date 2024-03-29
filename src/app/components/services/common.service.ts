import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {CookieService} from "ngx-cookie";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {updateDTO} from "../dto/UpdateCompDTO";
import {componentDTO} from "../dto/componentDTO";
import {Observable} from "rxjs";
import {CartDTO} from "../dto/cartDTO";
import {OrderDTO} from "../dto/orderDTO";

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  Url = environment.baseUrl;

  constructor(private http: HttpClient,private cookieService: CookieService) { }


  addComponent(componentdto: componentDTO, imageURL:any): Observable<any> {
    // console.log("add component")
    // console.log(imageURL)
    // console.log(imageURL.name)

    // const formData: any = new FormData();
    //
    // formData.append("componetName", componentdto.componetName);
    // formData.append("componetDesc", componentdto.componetDesc);
    // formData.append("qty", componentdto.qty);
    // formData.append("unitPrice", componentdto.unitPrice);
    // formData.append("componetCode", componentdto.componetCode);
    // formData.append("imageURL",imageURL,imageURL.name);
    // console.log("udara3")
    // console.log(imageURL)
    return this.http.post<any>(this.Url+'/component/savecomp', {
      componetName: componentdto.componetName,
      componetDesc: componentdto.componetDesc,
      qty: componentdto.qty,
      unitPrice: componentdto.unitPrice,
      componetCode: componentdto.componetCode,
      imageURL:componentdto.imageURL,
    }, {
      headers:new HttpHeaders({

        // 'Authorization': 'Bearer ' + JSON.parse(this.cookieService.get('token')),
      })
    })
  }

  updateComponents(updateCompDTO: updateDTO, imageURL:any): Observable<any>{

    // const formData: any = new FormData();
    //
    // formData.append("componetID",updateCompDTO.componetID);
    // formData.append("componetName", updateCompDTO.componetName);
    // formData.append("componetDesc", updateCompDTO.componetDesc);
    // formData.append("qty", updateCompDTO.qty);
    // formData.append("unitPrice", updateCompDTO.unitPrice);
    // formData.append("componetCode", updateCompDTO.componetCode);
    // formData.append("imageURL",imageURL,imageURL.name);


    return this.http.patch<any>(this.Url+'/component/updatecomps/'+updateCompDTO.componetID, {
      componetID: updateCompDTO.componetID,
      componetName: updateCompDTO.componetName,
      componetDesc: updateCompDTO.componetDesc,
      qty: updateCompDTO.qty,
      unitPrice: updateCompDTO.unitPrice,
      componetCode: updateCompDTO.componetCode,
      imageURL:updateCompDTO.imageURL,
    }, {
      headers:new HttpHeaders({
        // 'Authorization': 'Bearer ' + JSON.parse(this.cookieService.get('token'))
      })
    });
  }

  getAllComponents(pageIndex: string, pageSize: string): Observable<any> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("pageIndex",pageIndex);
    queryParams = queryParams.append("pageSize",pageSize);
    return this.http.get(this.Url+'/component/pagecomps', {
      headers:new HttpHeaders({
        'Content-Type':  'application/json',
        // 'Authorization': 'Bearer ' + JSON.parse(this.cookieService.get('token'))
      }),
      params:queryParams,
    });

  }

  deleteComponent(componetID: string| number): Observable<any> {
    return this.http.delete(this.Url+'/component/deletecomps/'+componetID, {
      headers:new HttpHeaders({
        'Content-Type':  'application/json',
        // 'Authorization': 'Bearer ' + JSON.parse(this.cookieService.get('token'))
      })
    });

  }



  searchComponent(componetID: string| number): Observable<any> {
    return this.http.get(this.Url+'/serach/'+componetID, {
      headers:new HttpHeaders({
        'Content-Type':  'application/json',
        // 'Authorization': 'Bearer ' + JSON.parse(this.cookieService.get('token'))
      })
    });

  }

  getItemDetails(componetID: any): Observable<any> {
    return this.http.get(this.Url+'/component/speccompsid/'+componetID, {
      headers:new HttpHeaders({
        'Content-Type':  'application/json',
        // 'Authorization': 'Bearer ' + JSON.parse(this.cookieService.get('token'))
      })
    });
  }

  getFiles(value: any): Observable<any> {
    return this.http.get(this.Url+'/searchImg/'+value, {
      headers:new HttpHeaders({
        'Content-Type':  'application/json',
        // 'Authorization': 'Bearer ' + JSON.parse(this.cookieService.get('token'))
      })
    });
  }

  addCart(cartdto: CartDTO): Observable<any> {
    return this.http.post<any>(this.Url+'/cart/savecart', {
      cartid: cartdto.cartid,
      userid: cartdto.userid,
      imageURL: cartdto.imageURL,
      componetID: cartdto.componetID,
      componetName: cartdto.componetName,
      quantity: cartdto.quantity,
    }, {
      headers:new HttpHeaders({

        // 'Authorization': 'Bearer ' + JSON.parse(this.cookieService.get('token')),
      })
    })
  }

  getCart(): Observable<any> {
    return this.http.get(this.Url+'/cart/allcart', {
      headers:new HttpHeaders({
        'Content-Type':  'application/json',
        // 'Authorization': 'Bearer ' + JSON.parse(this.cookieService.get('token'))
      })
    });
  }

  BuyProducts(orderDTO: OrderDTO) {
    return this.http.post<any>(this.Url+'/order/saveorder', {
      orderid: orderDTO.orderid,
      userid: orderDTO.userid,
      orderdate: orderDTO.orderdate,
      orderamount: orderDTO.orderamount,
      orderstatus: orderDTO.orderstatus,
      sippingaddress: orderDTO.sippingaddress,
      paymentmethod: orderDTO.paymentmethod,
      paymentstatus: orderDTO.paymentstatus,
    }, {
      headers:new HttpHeaders({

        // 'Authorization': 'Bearer ' + JSON.parse(this.cookieService.get('token')),
      })
    })
  }

  getAllOrders() : Observable<any> {
    return this.http.get(this.Url+'/order/allorders', {
      headers:new HttpHeaders({
        'Content-Type':  'application/json',
        // 'Authorization': 'Bearer ' + JSON.parse(this.cookieService.get('token'))
      })
    });
  }
}
