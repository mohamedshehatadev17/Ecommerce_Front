import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private readonly myClient: HttpClient) {}
  private readonly API_URL = 'https://localhost:7052/api/';

  getCartProductsByCustomerId() {
    return this.myClient.get<any>(`${this.API_URL}cart/CartProducts`);
  }

  deleteCartProduct(item: any) {
    const options = {
      body: item,
    };
    return this.myClient.delete(
      this.API_URL + 'Cart/DeletePrdouctFromCart',
      options
    );
  }

  deleteCart() {
    return this.myClient.delete(`${this.API_URL}Cart`);
  }

  updateCartProduct(productId: string, cartId: string, quantity: number) {
    const body = {
      ProductId: productId,
      CartId: cartId,
      Quantity: quantity,
    };
    return this.myClient.put<any>(`${this.API_URL}cart`, body);
  }

  getProductDetails(productId: string) {
    return this.myClient.get<any>(
      `${this.API_URL}product/Details/${productId}`
    );
  }

  UpdateProductCountPlus(product: any) {
    return this.myClient.patch(`${this.API_URL}Cart/Increase`, product);
  }

  UpdateProductCountDecr(product: any) {
    return this.myClient.patch(`${this.API_URL}Cart/Decrease`, product);
  }
}
