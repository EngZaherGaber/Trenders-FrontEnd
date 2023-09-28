import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../Material/Material.module';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidatorFn, Validators, AbstractControl } from '@angular/forms';
import { UserService } from 'src/app/Services/user.service';
import { RouteReuseStrategy, Router } from '@angular/router';
// import { User } from 'src/app/Interfaces/user';
import { User } from '../../../Interfaces/user';
import { GeneralService } from 'src/app/Services/general.service';
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
    inp: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  constructor(private fb: FormBuilder, private userSrv: UserService, private router: Router) {
  }

  ngOnInit() {
  }


  getInpErrorMessage() {
    if (this.form.controls.inp.hasError('required')) {
      return 'You must enter a value';
    }
    else if (this.form.controls.inp.hasError('email')) {
      return 'Your Email Not In Correct Syntax';
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
    else {
      return ''
    }
  }

  submit() {
    if (!this.form.invalid) {
      // this.userSrv.loggingUser = this.user;
      // this.router.navigate(['/home']);
    }
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  login() {
    if (!this.form.invalid) {
      this.userSrv.login(this.form.value.inp, this.form.value.password);
    }
    else {
      this.form.markAllAsTouched();
    }
  }
}

