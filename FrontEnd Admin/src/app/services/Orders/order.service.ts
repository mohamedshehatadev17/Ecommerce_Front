import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private http: HttpClient) {}

  getAllOrders(): Observable<any> {
    return this.http.get('https://localhost:7052/api/Orders/OrdersCutomerName');
  }
  updateOrder(order :any){
    return this.http.put('https://localhost:7052/api/Orders',order);
  }
}
