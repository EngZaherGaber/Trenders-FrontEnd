import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MaterialModule } from '../../Material/Material.module';
import { Observable, of } from 'rxjs';
import { Category } from 'src/app/Interfaces/category';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatDatepicker } from '@angular/material/datepicker';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { ChangePasswordComponent } from '../../dialogs/change-password/change-password.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoriesService } from 'src/app/Services/categories.service';
import { CountriesService } from 'src/app/Services/countries.service';
import { OfferCardComponent } from '../offer-card/offer-card.component';
import { Offer } from 'src/app/Interfaces/offer';
import { OffersService } from 'src/app/Services/offers.service';

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
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, OfferCardComponent, ReactiveFormsModule, FormsModule, MaterialModule, NgxMaskDirective],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [provideNgxMask(),
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
export class ProfileComponent {
  form = this.fb.group({
    user_info: this.fb.group({
      type: ['', Validators.required],
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirm: ['', Validators.required, this.confirmValidator()],
    }),
    other_info: this.fb.group({
      categories: ['', Validators.required],
      createdDate: ['', Validators.required],
      address: ['', Validators.required],
    })

  });
  hide: boolean = false;
  editMode: boolean = false;
  hideConfirm: boolean = false;
  Lcategories$: Observable<Category[]>;
  Lcities$: Observable<string[]>;
  Loffers_ended$: Observable<Offer[]>;
  offers_ended: Offer[];
  constructor(private offerSrv: OffersService, private fb: FormBuilder, private categoriesSrv: CategoriesService, private countrySrv: CountriesService, private dialog: MatDialog, private _snackBar: MatSnackBar) { }
  ngOnInit() {
    this.form.disable();
    this.Lcategories$ = this.categoriesSrv.getAllCategories();
    this.Lcities$ = this.countrySrv.getAllCities('Syria');
    this.offers_ended = this.offerSrv.getOffersByStatus('');
  }
  ChangePassword() {
    const dialogRef = this.dialog.open(ChangePasswordComponent, {

      enterAnimationDuration: '2000ms',
      exitAnimationDuration: '2000ms',
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res === 'OK') {
        this._snackBar.open('Password Change!')
      }
      else {
        this._snackBar.open('Password Not Change!')

      }
    })
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
      return 'You must enter a value';
    }
    else {
      return ''
    }
  }
  getCreatedDateErrorMessage() {
    if (this.form.controls.other_info.controls.createdDate.hasError('required')) {
      return 'You must enter a value';
    }
    else {
      return ''
    }

  }
  getCategoriesErrorMessage() {
    if (this.form.controls.other_info.controls.createdDate.hasError('required')) {
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
}
