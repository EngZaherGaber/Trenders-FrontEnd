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
export const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY',
  },
  display: {
    dateInput: 'YYYY',
    monthYearLabel: 'YYYY',
    monthYearA11yLabel: 'YYYY',
    yearLabel: 'YYYY'
  },
};
export const MY_FORMATS2 = {
  parse: {
    dateInput: 'YYYY-MM-DD',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    monthYearA11yLabel: 'MMMM YYYY',
    yearLabel: 'YYYY'
  },
};
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [HttpClientModule, CommonModule, MaterialModule, ReactiveFormsModule, FormsModule, NgxMaskDirective],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [HttpClient, provideNgxMask(),
    {
      provide: DateAdapter, useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {
      provide: MAT_DATE_FORMATS, useValue: MY_FORMATS
    },
    {
      provide: MAT_DATE_FORMATS, useValue: MY_FORMATS2
    },]
})
export class RegisterComponent {

  //viewChild
  @ViewChild('categoryInput') categoryInput: ElementRef<HTMLInputElement>;
  @ViewChild('yearpicker', { static: false }) private picker!: MatDatepicker<Date>;
  //

  // variables
  countries = this.countrySrv.countries;
  // countries$ = this.countrySrv.countries$;
  currencies = this.countrySrv.currencies;
  catgeories = this.categoriesSrv.categories;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  filteredCatgeories: Observable<string[]>;
  prefix: string = '+963';
  cities = [];
  categoryCtrl = this.fb.control('');
  stepperOrientation: Observable<StepperOrientation>;
  selectYear;
  //


  // form
  form = this.fb.group({
    user_info: this.fb.group({
      role: ['', Validators.required],
      username: ['', [Validators.required, this.usernameValidator()]],
      email: ['', [Validators.required, Validators.email, this.emailValidator()]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirm: ['', Validators.required, this.confirmValidator()],
      phone_number: [this.prefix, Validators.required, this.phoneValidator()],
    }),
    other_info: this.fb.group({
      country: this.fb.control('', Validators.required),
      city: this.fb.control('', Validators.required),
      currency: this.fb.control('', Validators.required)
    })
  });
  companyForm = this.fb.group({
    name: this.fb.control('', [Validators.required,]),
    description: this.fb.control('', Validators.required),
    categories: this.fb.array([]),
    release_date: this.fb.control('', Validators.required),
  });
  customerForm = this.fb.group({
    firstName: this.fb.control('', Validators.required),
    lastName: this.fb.control('', Validators.required),
    birth_date: this.fb.control('', Validators.required),
  });
  bankForm = this.fb.group({
    name: this.fb.control('', Validators.required),
    description: this.fb.control('', Validators.required),
  });
  delevieryForm = this.fb.group({
    name: this.fb.control('', Validators.required),
    description: this.fb.control('', Validators.required),
    categories: this.fb.array([]),
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
    this.filteredCatgeories = this.categoryCtrl.valueChanges.pipe(
      startWith(null),
      map((cat: string | null) => (cat ? this._filter(cat) : this.catgeories.slice())),
    );
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
      const name  : string = control.value;
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
  phoneValidator(): ValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const a: string = '';
      let isValid: boolean = false;
      if (control.value.indexOf('+') < 0) {
        const confirm = control.value.slice(this.prefix.length - 1);
        isValid = confirm.length > 0;
      }
      else {
        const confirm = control.value.slice(this.prefix.length);
        isValid = confirm.length > 0;
      }
      return isValid ? of(null) : of({ 'length': true })
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
  //

  // prefix
  getprefix() {
    const lngth = this.prefix.slice(1).length;
    const name = this.countries.find(x => (x.idd.root + (x.idd.suffixes?.[0] || '')) === this.prefix)?.name.common || '';
    const tLength = this.countrySrv.countryPhoneLengths.find(x => x.name == name)
    let mask: string = '';
    switch (lngth) {
      case 1:
        mask = '+0';
        break;
      case 2:
        mask = '+00';
        break;
      case 3:
        mask = '+000';
        break;
      default:
        mask = '+0000';
        break;
    }
    for (let i = 0; i < tLength?.phoneLength || 0; i++) {
      if (i % 3 === 0) {
        mask += ' '
      }
      mask += '0'
    }
    return mask;
  }
  addPrefix() {
    this.form.controls.user_info.controls.phone_number.patchValue(this.prefix);
  }
  preventRemovePrefix() {
    const str: string = this.prefix + this.form.controls.user_info.value.phone_number.slice(this.prefix.length - 1);
    this.form.controls.user_info.controls.phone_number.patchValue(str);
  }
  //

  // categories
  addCategory(event: MatChipInputEvent) {
    const value = (event.value || '').trim();
    if (value) {
      const arr = this.companyForm.value.categories;
      arr.push(value);
    }
  }
  removeCategory(category: any) {
    const arr = this.companyForm.value.categories;
    const index: number = arr.indexOf(category);
    if (index >= 0) {
      arr.splice(index, 1);
    }

  }
  selectedCategory(event: MatAutocompleteSelectedEvent): void {
    const arr = this.companyForm.value.categories;
    if (arr.indexOf(event.option.value) === -1) {
      arr.push(event.option.viewValue);
    }
    this.categoryInput.nativeElement.value = '';
    this.categoryCtrl.setValue(null);
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.catgeories.filter(item => item.toLowerCase().includes(filterValue));
  }
  //

  //date picker
  onYearSelected(momentInstance: moment.Moment, datepicker: MatDatepicker<Date>) {
    const normializedYear = typeof (momentInstance)
    this.companyForm.controls.release_date.setValue(momentInstance.year().toString());
    datepicker.close();
  }
  //

  //state
  getState(event: any) {
    this.cities = this.countrySrv.cities.find(x => x.country === event.value)?.cities || [];
  }
  //

  submit() {
    this.userSrv.addUser(this.form.controls.user_info.value.username,
      this.form.controls.user_info.value.password,
      this.form.controls.user_info.value.email,
      this.form.controls.user_info.value.role,
      this.form.controls.other_info.value.city,
      this.form.controls.other_info.value.country,
      this.form.controls.other_info.value.currency,
      this.form.controls.user_info.value.phone_number);
    const user: User = this.userSrv.getUser(this.form.controls.user_info.value.username);
    console.log(user);
    //////////////////////////////
    if (user) {
      switch (this.form.controls.user_info.value.role) {
        case 'company':
          const catC: string[] = this.companyForm.value.categories as string[];
          this.comSrv.addCompany(this.companyForm.value.name,
            this.companyForm.value.description,
            catC,
            this.companyForm.value.release_date,
            user.id)
          console.log(this.comSrv.companyList);
          break;
        case 'customer':
          const dat = new Date(this.customerForm.value.birth_date)
          this.cusSrv.addCustomer(this.customerForm.value.firstName,
            this.customerForm.value.lastName,
            dat,
            user.id)
          console.log(this.cusSrv.customerList)
          break;
        case 'bank':
          this.bnkSrv.addBank(this.bankForm.value.name, this.bankForm.value.description, user.id);
          console.log(this.bnkSrv.bankList);
          break;
        case 'deleivery':
          const catD: string[] = this.delevieryForm.value.categories as string[];
          this.delSrv.addDeleivery(this.delevieryForm.value.name, this.delevieryForm.value.description, catD, user.id)
          console.log(this.delSrv.deleiveryList)
          break;
      }
      this.userSrv.loggingUser = user;
      this.router.navigate(['home'])
    }
    /////////////////////////////
  }
}
