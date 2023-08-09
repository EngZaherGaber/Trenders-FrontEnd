// importing
import { Component, NgModule, ViewChild, ElementRef } from '@angular/core';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { CommonModule } from '@angular/common';
import { FormBuilder, ValidationErrors, ReactiveFormsModule, Validators, FormsModule, FormControl, ValidatorFn, AbstractControl, FormGroup, FormArray } from '@angular/forms';
import { UserService } from 'src/app/Services/user.service';
import { Router } from '@angular/router';
import { MaterialModule } from '../../Material/Material.module';
import { Observable, map, of, startWith } from 'rxjs';
import { StepperOrientation } from '@angular/cdk/stepper';
import { BreakpointObserver } from '@angular/cdk/layout';
import { CountriesService } from '../../../Services/countries.service';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { CategoriesService } from 'src/app/Services/categories.service';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import * as moment from 'moment';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatDatepicker } from '@angular/material/datepicker';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CountryData } from '../../../Interfaces/country-data';
import { User } from 'src/app/Interfaces/user';
import { CompanyService } from 'src/app/Services/company.service';
import { CustomerService } from 'src/app/Services/customer.service';
import { BankService } from 'src/app/Services/bank.service';
import { DeleiveryService } from 'src/app/Services/deleivery.service';
//
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [HttpClientModule, CommonModule, MaterialModule, ReactiveFormsModule, FormsModule, NgxMaskDirective],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [HttpClient]
})
export class RegisterComponent {
  // variables
  Lcatgeories = this.categoriesSrv.categories;
  cities = [];
  stepperOrientation: Observable<StepperOrientation>;
  //

  // form
  form = this.fb.group({
    user_info: this.fb.group({
      role: ['', Validators.required],
      username: ['', [Validators.required, this.usernameValidator()]],
      email: ['', [Validators.required, Validators.email, this.emailValidator()]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirm: ['', Validators.required, this.confirmValidator()],
    }),
    other_info: this.fb.group({
      categories: ['', Validators.required],
      createdDate: ['', Validators.required],
      address: ['', Validators.required],
    })

  });
  //

  // constructor
  constructor(private breakpointObserver: BreakpointObserver,
    private fb: FormBuilder,
    private userSrv: UserService,
    private comSrv: CompanyService,
    private cusSrv: CustomerService,
    private bnkSrv: BankService,
    private delSrv: DeleiveryService,
    private router: Router,
    private http: HttpClient,
    private categoriesSrv: CategoriesService,
    private countrySrv: CountriesService) {
    this.stepperOrientation = breakpointObserver.observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
  }
  //

  // Validator
  emailValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const email = control.value;
      const user = this.userSrv.getUser(email);
      let isValid: boolean = true;
      if (user) {
        isValid = false;
      }
      return isValid ? null : { 'Found': true };
    };
  }
  nameValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const name: string = control.value;
      let isValid: boolean;
      if (name.indexOf('')) {
        isValid = false;
      }
      return isValid ? null : { 'input': true };
    };
  }
  usernameValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const username = control.value;
      const user = this.userSrv.getUser(username);
      let isValid: boolean = true;
      if (user) {
        isValid = false;
      }
      return isValid ? null : { 'Found': true };
    };
  }
  confirmValidator(): ValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const password = this.form.controls.user_info.value.password;
      const confirm = control.value;
      let isValid: boolean = password === confirm;
      return isValid ? of(null) : of({ 'confirm': true })
    };
  }
  //

  // Error Message
  getEmailErrorMessage() {
    if (this.form.controls.user_info.controls.email.hasError('required')) {
      return 'You must enter a value';
    }
    else if (this.form.controls.user_info.controls.email.hasError('email')) {
      return 'Your Email Not Correct';
    }
    else if (this.form.controls.user_info.controls.email.hasError('Found')) {
      return 'Your Email is Exist';
    }
    else {
      return ''
    }
  }
  getPasswordErrorMessage() {
    if (this.form.controls.user_info.controls.password.hasError('required')) {
      return 'You must enter a value';
    }
    else if (this.form.controls.user_info.controls.password.hasError('minlength')) {
      return 'Your Password should at least 8 characters';
    }
    else {
      return ''
    }
  }
  getConfirmErrorMessage() {
    if (this.form.controls.user_info.controls.confirm.hasError('required')) {
      return 'You must enter a value';
    }
    else if (this.form.controls.user_info.value.password !== this.form.controls.user_info.value.confirm) {
      return 'Not Matching';
    }
    else {
      return ''
    }
  }
  getUsernameErrorMessage() {
    if (this.form.controls.user_info.controls.username.hasError('required')) {
      return 'You must enter a value';
    }
    else if (this.form.controls.user_info.controls.username.hasError('Found')) {
      return 'Your Username is Exist';
    }
    else {
      return ''
    }
  }
  getAddressErrorMessage() {
    if (this.form.controls.other_info.controls.address.hasError('required')) {
      return 'You must enter a value';
    }
    else {
      return ''
    }
  }
  //

  //state
  getState(event: any) {
    this.cities = this.countrySrv.cities.find(x => x.country === 'Syria')?.cities || [];
  }
  //

  submit() {
    this.userSrv.addUser(this.form.controls.user_info.value.username,
      this.form.controls.user_info.value.password,
      this.form.controls.user_info.value.email,
      this.form.controls.other_info.value.categories
    );
    const user: User = this.userSrv.getUser(this.form.controls.user_info.value.username);
    //////////////////////////////
    if (user) {
      switch (this.form.controls.user_info.value.role) {
        case 'company':

          break;
        case 'institute':

          break;
      }
      this.userSrv.loggingUser = user;
      this.router.navigate(['home'])
    }
    /////////////////////////////
  }
}
