import { Component, ElementRef, OnInit, Renderer2, enableProdMode } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CheckOutService } from 'src/app/services/check-out.service';
import { NgModule } from '@angular/core';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Order } from 'src/app/Models/Order';
import * as bootstrap from 'bootstrap';
@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {
  ID = "";
  cart: any;
  customer: any;
  anotherAddress = false;
  credit = false;
  paypal = false;
  order: Order = {
    city: '',
    street: '',
    country: '',
    paymentStatus: '',
    paymentMethod: '',
    totalPrice:0,
    orderProducts: [{
      productCount: 0,
      productId: ''
    }]
  };
cost:any;
  constructor(private service: CheckOutService, private route: ActivatedRoute, private router: Router,
    private renderer: Renderer2, private el: ElementRef
              ) {
    this.ID = route.snapshot.params["id"]
  }

  ngOnInit(): void {
    this.service.GetCartProducts().subscribe(
      {
        next: (data) => {
          this.cart = data;
         console.log(data)
          this.cost=this.CalculateTotalCost(this.cart);
        },
        error: (error) => { console.log(error) }
      }
    )
    this.service.GetCustomer().subscribe({
      next: (data) => {
        console.log(data);
        this.customer = data;
      },
      error: (error) => { console.log(error) }
    })
  }

  CalculateTotalCost(cart:any) {
    let discount = 0;
    console.log(cart)
    let total=0;
    cart.products.forEach((p: { price: number; discount: number; quantity: number; }) => {
      
      total += p.price*(1-p.discount)*p.quantity;
      
    });

   
    discount = cart.totalCost - total;
    //this.cart.totalCost = totalcost;
    
    return  {
      discount:discount,
      total:total
    };

  }

  myForm = new FormGroup({
    street: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required])
  });


  onSubmit() {
    if (!this.myForm.valid && this.anotherAddress) {
      this.myForm.markAllAsTouched();

    } else {
     
      console.log(this.myForm.value);
      this.order = {
        city: this.customer.city,
        street: this.customer.street,
        country: this.customer.country,
        paymentStatus: 'Unpaid',
        paymentMethod: 'CashOnDelivery',
        totalPrice:this.cost.total,
        orderProducts: []
      }
      if (this.myForm.value.city != undefined &&
        this.myForm.value.country != undefined &&
        this.myForm.value.street != undefined &&
        this.myForm.value.street != '' &&
        this.myForm.value.city != '' &&
        this.myForm.value.country != '') 
        {
        this.order.street = this.myForm.value.street;
        this.order.city = this.myForm.value.city;
        this.order.country = this.myForm.value.country;
      }

      for (let i = 0; i < this.cart.products.length; i++) {
        this.order.orderProducts.push({ productId: this.cart.products[i].productId ,
          color: this.cart.products[i].color,
           productCount: this.cart.products[i].quantity,
           size: this.cart.products[i].size,
           price: this.cart.products[i].price,
           })
      }
      
      console.log(this.order);
      ///////////1- Check Quantity Valid & Added Order & Decrease Quantity && 4- Delete Cart  //////////
      this.service.PlaceOrder(this.order).subscribe({
        next:(data)=>{
          const modalElement = this.el.nativeElement.querySelector('#confirmationModal');
          
          const modal = new bootstrap.Modal(modalElement);
          this.renderer.addClass(modalElement, 'show');
          this.renderer.setStyle(modalElement, 'display', 'block');
          modal.show();
      
      setTimeout(() => {
        this.renderer.removeClass(modalElement, 'show');
        this.renderer.setStyle(modalElement, 'display', 'none');
        modal.hide();
        this.router.navigate(["/"])
      }, 4000);          
        },
        error:(error1)=> {console.log("notAdded")}
      })
    }
  }
}

