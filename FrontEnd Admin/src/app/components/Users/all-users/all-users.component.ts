import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/Customers/customer.service';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit {
  searchInput:string;
  
  constructor(private readonly userService:CustomerService) {
    this.searchInput = "";
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  
}
