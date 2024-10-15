import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/services/Customer/customer.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent {
  message: any;
  displayAlert = 'd-none';
  FlagError = false;

  constructor(protected _ser: CustomerService, private router: Router) {}

  passFrm = new FormGroup({
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    npassword: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    cpassword: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });
  keyPressMinLength(event: any, len: number) {
    let inp = event.target.value;
    inp.length < len ? true : event.preventDefault();
  }

  validatePassword() {
    const pass = this.passFrm.get('npassword')?.value;
    const confirmPassword = this.passFrm.get('cpassword')?.value;

    if (pass !== confirmPassword) {
      this.passFrm.get('cpassword')?.setErrors({ passwordMismatch: true });
    } else {
      this.passFrm.get('cpassword')?.setErrors(null);
    }
  }

  p = false;
  np = false;
  cp = false;
  togglePassword(id: string) {
    switch (id) {
      case 'p':
        this.p = !this.p;
        break;
      case 'np':
        this.np = !this.np;
        break;
      case 'cp':
        this.cp = !this.cp;
        break;

      default:
        break;
    }
    // this.showPassword[id] = !this.showPassword[id];
    const passwordInput = document.getElementById(id);
    // if (!this.showPassword[id]) {
    //   passwordInput?.setAttribute('type', 'password');
    // } else if (this.showPassword[id]) {
    //   passwordInput?.setAttribute('type', 'text');
    // }
  }

  ChangePassword() {
    if (this.passFrm.invalid) {
      // Display error messages
      Object.keys(this.passFrm.controls).forEach((field) => {
        const control = this.passFrm.get(field);
        if (control?.invalid) {
          control.markAsTouched({ onlySelf: true });
          console.log(control);
        }
      });
      //console.log('I am Invalid');
    } else if (this.passFrm.valid) {
      this._ser
        .ResetPassword({
          currentPassword: this.passFrm.value.password,
          newPassword: this.passFrm.value.npassword,
        })
        .subscribe(
          (response) => console.log('Form submitted successfully', response),
          (error: HttpErrorResponse) => {
            if (error.status == 201) {
              this.router.navigateByUrl('/home');
            } else {
              this.openDialog('wrong password', true);
            }
          }
        );
    }
  }

  openDialog(mess: string, errFlag: boolean) {
    this.message = mess;
    this.FlagError = errFlag;
    this.displayAlert = 'd-block';
  }

  closePopup() {
    this.displayAlert = 'd-none';
    if (this.FlagError) {
      this.passFrm.get('password')?.setValue('');
    } else {
      Object.keys(this.passFrm.controls).forEach((key) => {
        this.passFrm.get(key)?.setValue('');
      });
    }
  }
}
