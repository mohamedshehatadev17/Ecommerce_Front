import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductDetailsService {
  constructor(private productData: HttpClient) {}

  baseUrl = 'https://localhost:7052/api/Products/';

  GetProductDetails(id: any) {
    return this.productData.get(this.baseUrl + 'ColorDistinct/' + id);
  }

  // FilterProductByColor(queryParam: any): Observable<any> {
  //   return this.productData.get(
  //     this.baseUrl + 'FillterByColor' + `?Id=${queryParam}`
  //   );
  // }

  AddtoCart(product: any) {
    return this.productData.post("https://localhost:7052/api/Cart/AddCart",product);
  }
}
