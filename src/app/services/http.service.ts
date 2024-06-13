import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { url } from '../url';
import { LoginRes } from '../interface/login-res';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor() { }

  http: HttpClient = inject(HttpClient)

  login(data: any): Observable<any> {
    return this.http.post(url.BASE_URL + url.LOGIN, data)
  }

  signUp(data: any) {
    return this.http.post(url.BASE_URL + url.SIGNUP, data)
  }

  getUser() {
    return this.http.get(url.BASE_URL + url.USER, { headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` } })
  }
}
