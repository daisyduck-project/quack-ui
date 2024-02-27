import { Component, signal } from '@angular/core';
import { MaterialModule } from '../material.module';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MembersService } from '../common/members.service';
import { Md5 } from 'ts-md5';
import { Credentials } from '../common/credentials';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-join',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule],
  templateUrl: './join.component.html',
  styleUrl: './join.component.scss'
})
export class JoinComponent {
  registerForm: FormGroup;
  hide = signal(true);
  loading = signal(false);
  registrationSuccess = signal(false);
  constructor(private router: Router, private service: MembersService, private _snackbar: MatSnackBar) {
    this.registerForm = new FormGroup({
      email: new FormControl("",Validators.required),
      username: new FormControl("", Validators.required),
      password: new FormControl("",[Validators.required,Validators.minLength(8)]),
    });
   }
  redirectToHome() {
    this.router.navigate(['/home']);
    
  }
  redirectToLogin() {
    this.registrationSuccess.set(false);
    this.router.navigate(['/login']);
  }
  registerMember(form: FormGroup) {
    if (form.valid) {
      const md5 = new Md5();
      let newCred: Credentials = {
        email: form.value.email,
        username: form.value.username,
        password: md5.appendStr(form.value.password).end() as string,
      }
      this._snackbar.dismiss();
      this.service.registerCredentials(newCred).subscribe({
        error: (err) => {
          if (err.status == 409) {
            this._snackbar.open('Email address already registered!', 'Ok');
          } else {
            this._snackbar.open('System Temporary Unavailable!', 'Ok');
          }
          this.loading.set(false);
          console.error(err);
        },
        next: () => {
          this._snackbar.open('User created successfully', 'Ok');
          this.loading.set(false);
          this.registrationSuccess.set(true);
        },
      });
    }
  }
}
