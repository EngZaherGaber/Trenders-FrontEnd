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
import { Category } from 'src/app/Interfaces/category';
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
  // variables
  Lcategories$: Observable<Category[]>;
  Lcities$: Observable<string[]>;
  stepperOrientation: Observable<StepperOrientation>;
  hide: boolean = false;
  hideConfirm: boolean = false;
  selectedFile: File | null = null;
  //

  // form
  form = this.fb.group({
    user_info: this.fb.group({
      type: ['', Validators.required],
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      img: [null],
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
    private router: Router,
    private http: HttpClient,
    private categoriesSrv: CategoriesService,
    private countrySrv: CountriesService) {
    this.stepperOrientation = breakpointObserver.observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
  }
  // Hooks
  ngOnInit() {
    this.Lcategories$ = this.categoriesSrv.getAllCategories();
    this.Lcities$ = this.countrySrv.getAllCities('Syria');
  }

  // Validator
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
    else {
      return ''
    }
  }
  getAddressErrorMessage() {
    if (this.form.controls.other_info.controls.address.hasError('required')) {
      console.log('You must enter a value')
      return 'You must enter a value';
    }
    else {
      return ''
    }
  }
  //

  //state
  changeState(event) {
    this.form.controls.other_info.value.address = event.value;
  }
  AddressToushed() {
    this.form.controls.other_info.controls.address.markAllAsTouched();
    console.log(this.form.controls.other_info.controls.address.touched, this.form.controls.other_info.controls.address.invalid)
  }
  changeAddress(event) {
    if (this.form.controls.other_info.value.address !== '') {
      this.form.controls.other_info.value.address += ',' + event.srcElement.value;
    }
  }
  //

  //date picker
  onYearSelected(momentInstance: moment.Moment, datepicker: MatDatepicker<Date>) {
    this.form.controls.other_info.controls.createdDate.setValue(momentInstance.year().toString());
    datepicker.close();
  }
  //
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] as File;
    this.form.controls.user_info.controls.img.patchValue(this.selectedFile);
    this.form.controls.user_info.controls.img.markAsTouched();
  }
  submit() {
    const formdata: FormData = new FormData();
    formdata.append('profileImg', this.form.controls.user_info.value.img);
    formdata.append('name', this.form.controls.user_info.value.username);
    formdata.append('email', this.form.controls.user_info.value.email);
    formdata.append('password', this.form.controls.user_info.value.password);
    formdata.append('type', this.form.controls.user_info.value.type);
    formdata.append('password_confirmation', this.form.controls.user_info.value.confirm);
    formdata.append('category_ids', this.form.controls.other_info.value.categories);
    formdata.append('address', this.form.controls.other_info.value.address);
    formdata.append('created_in', this.form.controls.other_info.value.createdDate);
    this.userSrv.addUser(formdata);
    //////////////////////////////

    /////////////////////////////
  }
}
