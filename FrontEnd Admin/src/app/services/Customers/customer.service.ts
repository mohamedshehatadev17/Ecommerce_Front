import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LoginDto } from 'src/app/Models/LoginDto';
import { TokenDto } from 'src/app/Models/TokenDto';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  public isLoggedIn$ = new BehaviorSubject<boolean>(false);
  // ==============================================================
  constructor(private http: HttpClient) {}
  private readonly API_URL = 'https://localhost:7052/api/';
  GetCustomerInfoById(CustomerId: any) {
    return this.http.get(`https://localhost:7052/api/Customer/${CustomerId}`);
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
        })
      );
  }

  public getTestData(): Observable<string[]> {
    return this.http.get<string[]>(this.API_URL + 'Test/test');
  }
}
