import { Component, OnInit } from '@angular/core';
import { CustomerService } from './services/Customer/customer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private authenticationService: CustomerService) {
    // localStorage.removeItem('token');
    // localStorage.removeItem('expiration');
  }

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.authenticationService.isLoggedIn$.next(true);
    }
  }
  title = 'Front_ITI_GP';
}
