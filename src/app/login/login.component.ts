import { Component, signal } from '@angular/core';
import { MaterialModule } from '../material.module';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Md5 } from 'ts-md5';
import { Credentials } from '../common/credentials';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MembersService } from '../common/members.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup;
  hide = signal(true);
  loading = signal(false);
  constructor(private router: Router, private _snackbar: MatSnackBar, private service: MembersService) {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  redirectToHome() {
    this.router.navigate(['/home']);
  }

  login(form: FormGroup) {
    if (form.valid) {
      this.loading.set(true);
      const md5 = new Md5();
      let cred: Credentials = {
        email: form.value.email,
        password: md5.appendStr(form.value.password).end() as string,
      };
      this._snackbar.dismiss();
      this.service.login(cred).subscribe({
        error: (err) => {
          if (err.status == 404) {
            this._snackbar.open('Invalid Username or Password', 'Ok');
          } else {
            this._snackbar.open('System Error, Please try again', 'Ok');
            console.error(err);
          }
          this.loading.set(false);
          console.error(err);
        },
        next: (data: Credentials) => {
          if (data != null) {
            sessionStorage.setItem('userid', data.id!);
            sessionStorage.setItem('useremail', data.email!);
            sessionStorage.setItem('username', data.username!);
          }
        },
        complete: () => {
          this.router.navigate(['/feed']);
        },
      });
    }
  }
}
