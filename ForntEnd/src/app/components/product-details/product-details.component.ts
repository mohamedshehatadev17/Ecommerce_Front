import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductDetailsService } from 'src/app/services/Product Details/product-details.service';
import { Location } from '@angular/common';
import { error } from 'jquery';
import { WishListService } from 'src/app/services/wish-list.service';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  constructor(
    private productService: ProductDetailsService,
    private urlData: ActivatedRoute,
    private location: Location,
    private route: Router,
    private wishListService: WishListService,
    private renderer: Renderer2, private el: ElementRef
  ) {}
  productId = this.urlData.snapshot.params['id'];

  product: any;
  ColorSizes: any;
  maxQuantity: any;
  Quantity: any = 1;
  minQuantity: any = 1;
  colorValue: any;
  ImageCount: any;
  addCart: any;
  size: any;

  ngOnInit(): void {
    this.productService.GetProductDetails(this.productId).subscribe(
      (data) => {
        this.product = data;
        this.ColorSizes = this.product.productInfo[0];
        this.colorValue = this.product.productInfo[0].color;
        this.maxQuantity =
          this.product.productInfo[0].sizeQuantities[0].quantity;
        this.ImageCount = this.product.productImages.Count;
      },
      (error) => {
        if (error.status == 401) this.route.navigate(['/']);
      }
    );
  }

  Sizes(value: any) {
    this.Quantity = 1;
    this.colorValue = value;
    for (let i = 0; i < this.product.productInfo.length; i++) {
      if (this.product.productInfo[i].color == value) {
        this.ColorSizes = this.product.productInfo[i];
      }
    }
  }

  CheckMax() {
    if (this.Quantity < this.maxQuantity) this.Quantity++;
  }

  CheckMin() {
    if (this.Quantity > this.minQuantity) this.Quantity--;
  }

  QuantityCheck(e: any, size: any) {
    this.Quantity = 1;
    this.size = size;
    for (let i = 0; i < this.product.productInfo.length; i++) {
      if (this.product.productInfo[i].color == this.colorValue) {
        for (
          let j = 0;
          j < this.product.productInfo[i].sizeQuantities.length;
          j++
        ) {
          if (this.product.productInfo[i].sizeQuantities[j].size == size) {
            this.maxQuantity =
              this.product.productInfo[i].sizeQuantities[j].quantity;
          }
        }
      }
    }
  }

  GoBack() {
    this.location.back();
  }

  AddToCart() {
    this.addCart = {
      productId: this.product.id,
      productCount: this.Quantity,
      color: this.colorValue,
      size: this.size,
    };
    this.productService.AddtoCart(this.addCart).subscribe(
      (response) => {
        // Handle successful response
        console.log(response);
        const modalElement = this.el.nativeElement.querySelector('#AddedToCartModal');
          
        const modal = new bootstrap.Modal(modalElement);
        this.renderer.addClass(modalElement, 'show');
        this.renderer.setStyle(modalElement, 'display', 'block');
        modal.show();
    
    setTimeout(() => {
      this.renderer.removeClass(modalElement, 'show');
      this.renderer.setStyle(modalElement, 'display', 'none');
      modal.hide();
      
    }, 1000);
      },
      (error) => {
        // Handle error response
        console.log(error);
        if (error.status === 401) {
          this.route.navigate(['/login']);
        }
      }
    );

    console.log(this.addCart);
  }

  selectedColor: string = '';
  selectedSize: any;
  selectColor(color: string) {
    this.selectedColor = color;
  }
  selectSize(size: string) {
    if (this.selectedSize === size) {
      this.selectedSize = null;
    } else {
      this.selectedSize = size;
    }
  }

  isAddedToWishlist = false;
  add: any;
  addToWishlist() {
    this.isAddedToWishlist = !this.isAddedToWishlist;

    this.add = { productId: this.productId };
    console.log(this.add);
    this.wishListService.addProductInWishlist(this.add).subscribe();
  }
}
