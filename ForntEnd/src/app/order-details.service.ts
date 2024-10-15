import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailsService {

  constructor(private http: HttpClient) {}

  getOrdersByCustomerId() {
    return this.http.get('https://localhost:7052/api/Orders/ByCustomer');
  }
}
