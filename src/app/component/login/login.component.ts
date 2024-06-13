import { Component, inject } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { HttpService } from 'src/app/services/http.service';
import Swal from 'sweetalert2';
import { LoginRes } from 'src/app/interface/login-res';
import { LoginErr } from 'src/app/interface/login-err';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  formBuilder: FormBuilder = inject(FormBuilder);
  httpService: HttpService = inject(HttpService);
  router: Router = inject(Router);


  loginForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  onLogIn() {

    this.httpService.login(this.loginForm.value).subscribe({
      next: (res: LoginRes) => {
        sessionStorage.setItem("token", res.token ?? "");
        sessionStorage.setItem("email", this.loginForm.value.email);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: res.message,
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(["/home"]);

      },
      error: (err: LoginErr) => {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.message
        });
      },
    });
  }
}
