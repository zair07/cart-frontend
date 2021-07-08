import { Injectable } from '@angular/core';
import { CartDTO } from '../CartEntity/CartEntity';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Message } from '../CartEntity/Message';

@Injectable({
  providedIn: 'root'
})
export class EcartService {

  constructor(private httpClient: HttpClient) { }

  callCart() : Observable<CartDTO[]>
  {
    // console.log("CALLING CART method");
    return this.httpClient.get<CartDTO[]>("http://localhost:2000/cart");
  }

  modifyProductQuantity(id:string, value:number) : Observable<Message>
  {
    // console.log("CALLING modify method");
    const body = { title: 'Angular PUT Request Example' };
    return this.httpClient.put<Message>("http://localhost:2000/cart/modify/"+id+"/"+value,body);
  }

  deleteProduct(id:string) : Observable<Message>
  {
    // console.log("CALLING delete method");
    return this.httpClient.delete<Message>("http://localhost:2000/cart/delete/"+id);
  }
}