import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/Orders/order.service';
import { OrderDto } from 'src/app/Models/Orders/OderDto';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  constructor(private readonly orderService: OrderService) { }

  AllOrders:OrderDto[]=[];
  ngOnInit(): void {
    this.orderService.getAllOrders().subscribe({
      next: (data: OrderDto[]) => {
        this.AllOrders = data;
        // console.log(this.paidOrders);
        // console.log(this.unpaidOrders);
      },
      error: (error) => console.log(error)
    });
  }
  changeToPaid(order: OrderDto): void {
    order.paymentStatus = 'Paid';
    order.orderStatus = "Delivered"
    this.orderService.updateOrder(order).subscribe({
      next: () => {
        //console.log("success")
      },
      error: (error) => console.log(error)
    });
  }
  get paidOrders(){
    return this.AllOrders.filter(order => order.paymentStatus === 'Paid');
  }
  get unpaidOrders(){
    return this.AllOrders.filter(order => order.paymentStatus === 'Unpaid') ;
  }
}




