import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LoginDto } from 'src/app/Models/LoginDto';
import { TokenDto } from 'src/app/Models/TokenDto';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  public isLoggedIn$ = new BehaviorSubject<boolean>(false);
  // ==============================================================
  constructor(private http: HttpClient, private router: Router) {}
  private readonly API_URL = 'https://localhost:7052/api/';

  GetCustomer() {
    return this.http.get(`${this.API_URL}Customer/GetByOne`);
  }
  AddCustomer(data: any) {
    return this.http.post(this.API_URL + 'Security/Register', data);
  }
  LoginCustomer(data: any) {
    return this.http.post(this.API_URL + 'Security/Login', data);
  }
  ResetPassword(data: any) {
    return this.http.patch(this.API_URL + 'Customer/RestPassword', data);
  }
  // ======================================================================
  public login(credentials: LoginDto): Observable<TokenDto> {
    return this.http
      .post<TokenDto>(this.API_URL + 'Security/Login', credentials)
      .pipe(
        tap((tokenDto) => {
          this.isLoggedIn$.next(true);
          localStorage.setItem('token', tokenDto.token);
          localStorage.setItem('expiration', tokenDto.exp);

          setInterval(() => {
            const token = localStorage.getItem('token');
            const expiration = localStorage.getItem('expiration');
            if (token && expiration && Date.now() > Date.parse(expiration)) {
              localStorage.removeItem('token');
              localStorage.removeItem('expiration');
            }
          }, 60000); // check every minute
        })
      );
  }
  public getTestData(): Observable<string[]> {
    return this.http.get<string[]>(this.API_URL + 'Test/test');
  }

  UpdateCustomerByID(customerUpdate: any) {
    console.log(customerUpdate);
    return this.http.patch(this.API_URL + `Customer`, customerUpdate);
  }

  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    this.router.navigate(['/home']);
  }
}
