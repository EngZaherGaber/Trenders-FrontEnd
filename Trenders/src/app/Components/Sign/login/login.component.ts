import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../Material/Material.module';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidatorFn, Validators, AbstractControl } from '@angular/forms';
import { UserService } from 'src/app/Services/user.service';
import { RouteReuseStrategy, Router } from '@angular/router';
// import { User } from 'src/app/Interfaces/user';
import { User } from '../../../Interfaces/user';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  hide: boolean = false;
  user: User;
  form = this.fb.group({
    inp: ['', [Validators.required, this.inpValidator()]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });
  constructor(private fb: FormBuilder, private userSrv: UserService, private router: Router) {
  }
  ngOnInit() {
    this.user = this.userSrv.loggingUser;
  }

  passwordValidator(user: User): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const password = control.value;
      const isValid = this.userSrv.checkPassword(user, password);
      return isValid ? null : { 'invalidPassword': true };
    };
  }
  inpValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const inp = control.value;
      let isValid: boolean;
      const newUsr = this.userSrv.getUser(inp)
      if (newUsr) {
        isValid = true;
      }
      else {
        isValid = false;
      }
      if (isValid) {
        this.user = newUsr;
        this.form.controls.password.addValidators(this.passwordValidator(this.user))
        return null;
      }
      else {
        return { 'invalidInp': true };
      }
    };
  }

  getInpErrorMessage() {
    if (this.form.controls.inp.hasError('required')) {
      return 'You must enter a value';
    }
    else if (this.form.controls.inp.hasError('invalidInp')) {
      return 'this Email/ User Name not found';
    }
    else {
      return ''
    }
  }
  getErrorMessage() {
    if (this.form.controls.password.hasError('required')) {
      return 'You must enter a value';
    }
    else if (this.form.value.password && this.form.value.password.length < 8) {
      return 'you must enter at least 8 character'
    }
    else if (this.form.controls.password.hasError('invalidPassword')) {
      console.log('wrong password')
      return 'your password is wrong';
    }
    else {
      return ''
    }
  }

  submit() {
    if (!this.form.invalid) {
      this.userSrv.loggingUser = this.user;
      this.router.navigate(['/home']);
    }
  }
  goToRegister() {
    this.router.navigate(['/register']);
  }
}

