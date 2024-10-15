import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/services/Customer/customer.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(private customerService: CustomerService,private router: Router) {}
  // private checkLogin = inject(CustomerService);

  public isLoggedIn: boolean = false;

  public customer: any;

  ngOnInit(): void {
    this.customerService.isLoggedIn$.subscribe(
      (logIn) => {
        this.isLoggedIn = logIn;
        // this.GetData();
      },
      (error) => {}
    );
    this.customerService.GetCustomer().subscribe(
      (data) => {
        this.customer = data;
      },
      (error) => {}
    );
  }

  logOut() {
    this.customerService.logout();

    this.isLoggedIn = false;
  }

  //   GetData() {
  //     if (this.isLoggedIn) {
  //       this.customerService.GetCustomer().subscribe(
  //         (data) => {
  //           this.customer = data;
  //         },
  //         (error) => {}
  //       );
  //     }
  //   }
  @ViewChild('selectList') selectList: any;
  Go(e:any){

    console.log("*********")
    console.log(e.target.value)
    if(e.target.value == 1){

      this.router.navigate(["category/712289e5-c634-4435-ae55-0df58818f469"]);
      this.selectList.nativeElement.selectedIndex = 0;
    }
    else if(e.target.value == 2){

      this.router.navigate(['category/e0e9459f-dd0e-48d8-865c-0e2fcd325d29']);
      this.selectList.nativeElement.selectedIndex = 0;
    }

    else if(e.target.value == 3){

      this.router.navigate(["category/d02de315-c29a-4d57-92f6-0e6892a491ba"]);
      this.selectList.nativeElement.selectedIndex = 0;
    }
  }
}
