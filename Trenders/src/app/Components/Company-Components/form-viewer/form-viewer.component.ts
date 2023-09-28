import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../Material/Material.module';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { DialogData } from '../../dialogs/change-password/change-password.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Detail } from '../../../Models/detail.model';
import { FormElement } from 'src/app/Interfaces/form-element';
import { TrendersService } from 'src/app/Services/trenders.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form-viewer',
  standalone: true,
  imports: [CommonModule, MaterialModule, ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule],
  templateUrl: './form-viewer.component.html',
  styleUrls: ['./form-viewer.component.scss']
})
export class FormViewerComponent {
  constructor(
    public dialogRef: MatDialogRef<FormViewerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private trndrSrv: TrendersService,
    private router: ActivatedRoute
  ) { }
  @ViewChild('form') formDesign: ElementRef;
  formGroup: FormGroup;
  // res: any

  ngOnInit(): void {

    this.data.details = this.addValueProperty(this.data.details);
    console.log(this.data)
    this.createForm();
  }
  ifValid(item, validator): boolean {
    if (this.formGroup.controls[item.Label].errors === null) {
      return false;
    }
    else if (
      this.formGroup.controls[item.Label].errors[validator.Type] &&
      this.formGroup.controls[item.Label].touched
    ) {
      return true;
    }
    return false;
  }
  createForm() {
    this.formGroup = this.fb.group({});

    for (let element of this.data.details) {
      let control = this.fb.control(element.Name === 'Select Menu' && element.Type === 'multiple' ? [] : '');
      element.Property.Validators.forEach((validator) => {

        switch (validator.Type) {
          case 'required':
            control.addValidators(Validators.required);
            break;
          case 'email':
            control.addValidators(Validators.email);
            break;
          case 'minlength':
            control.addValidators(Validators.minLength(validator.Value));
            break;
          case 'maxlength':
            control.addValidators(Validators.maxLength(validator.Value));
            break;
          case 'min':
            control.addValidators(Validators.min(validator.Value));
            break;
          case 'max':
            control.addValidators(Validators.max(validator.Value));
            break;
        }
      });
      this.formGroup.addControl(element.Label, control);
    }
  }
  addValueProperty(elements: FormElement[]): FormElement[] {
    return elements.map((element) => {
      return {
        ...element,
        Property: {
          ...element.Property,
          Value: null, // Set initial value to null
        },
      };
    });
  }
  hasMinLengthValidator(validators: any[]): boolean {
    return validators.some((validator) => validator.Type === 'MinLength');
  }
  hasMaxLengthValidator(validators: any[]): boolean {
    return validators.some((validator) => validator.Type === 'MaxLength');
  }
  getMaxLengthValidatorValue(item: any): string {
    const maxLengthValidator = item.Property.Validators.find(
      (validator) => validator.Type === 'MaxLength'
    );

    if (maxLengthValidator) {
      return maxLengthValidator.Value;
    } else {
      return '';
    }
  }
  getMinLengthValidatorValue(item: any): string {
    const minLengthValidator = item.Property.Validators.find(
      (validator) => validator.Type === 'MinLength'
    );

    if (minLengthValidator) {
      return minLengthValidator.Value;
    } else {
      return '0';
    }
  }
  getMaxValueValidatorValue(item: any): string {
    const maxLengthValidator = item.Property.Validators.find(
      (validator) => validator.Type === 'max'
    );

    if (maxLengthValidator) {
      return maxLengthValidator.Value;
    } else {
      return '';
    }
  }
  getMinValueValidatorValue(item: any): string {
    const minLengthValidator = item.Property.Validators.find(
      (validator) => validator.Type === 'min'
    );

    if (minLengthValidator) {
      return minLengthValidator.Value;
    } else {
      return '0';
    }
  }
  getErrorMessage(item: FormElement) {
    const control = this.formGroup.controls[item.Label];
    if (control.invalid && control.touched) {
      let err;
      let message;
      item.Property.Validators.forEach(valid => {
        err = control.errors[valid.Type];
        if (err) {
          message = valid.ErrorMessage;
        }
      })
      return message;
    }
    else {
      return '';
    }
  }
  submit() {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
    }
    else {

    }
  }
}
