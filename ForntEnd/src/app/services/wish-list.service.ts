import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WishListService {
  constructor(private readonly myClient: HttpClient) {}
  private readonly API_URL = 'https://localhost:7052/api/';

  getWishListByCustomerId() {
    return this.myClient.get<any>(`${this.API_URL}WishLists`);
  }
  addProductInWishlist(data: any) {
    return this.myClient.patch(`${this.API_URL}WishLists/add`, data);
  }
  deleteProductInWishlist(item: any) {
    const options = {
      productId: item,
    };
    return this.myClient.patch(`${this.API_URL}WishLists/delete`, options);
  }
}
