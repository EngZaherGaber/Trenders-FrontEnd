import { Component, Inject, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../Material/Material.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AppModule } from 'src/app/app.module';
import { BrowserModule } from '@angular/platform-browser';
import { AbstractControl, FormBuilder, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';

export interface DialogData {
  password: string;
  confirm: string;
}

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule],
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {
  constructor(private fb: FormBuilder,
    public dialogRef: MatDialogRef<ChangePasswordComponent>,
  ) { }
  hide: boolean = false;
  hideConfirm: boolean = false;
  form = this.fb.group({
    password: this.fb.control('', Validators.required),
    confirm: this.fb.control('', [Validators.required])
  })
  // Validator
  confirmValidator(): ValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      console.log(this.form.value)
      const password = this.form.value?.password;
      const confirm = control.value;
      let isValid: boolean = password === confirm;
      return isValid ? of(null) : of({ 'confirm': true })
    };
  }
  //
  getPasswordErrorMessage() {
    if (this.form.controls.password.hasError('required')) {
      return 'You must enter a value';
    }
    else if (this.form.controls.password.hasError('minlength')) {
      return 'Your Password should at least 8 characters';
    }
    else {
      return ''
    }
  }
  getConfirmErrorMessage() {
    if (this.form.controls.confirm.hasError('required')) {
      return 'You must enter a value';
    }
    else if (this.form.value.password !== this.form.value.confirm) {
      return 'Not Matching';
    }
    else {
      return ''
    }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  Save() {

    this.dialogRef.close('OK');
  }
}
