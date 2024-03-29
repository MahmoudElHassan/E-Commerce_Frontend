import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IUser } from '../shared/_models/user';
import { BehaviorSubject, ReplaySubject, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { IAddress } from '../shared/_models/address';

@Injectable({
  providedIn: 'root'
})
export class AccountService { 
  [x: string]: any;
  baseUrl = environment.apiUrl;
  private currentUserSource = new ReplaySubject<IUser>(1);
  currentUser$ = this.currentUserSource.asObservable();
  constructor(private http: HttpClient, private router: Router) { }

  // getCurrentUserValue() {
  //   return this.currentUserSource.value;
  // }

  loadCurrentUser(token: string | null) {
    if (token == null) {
      this.currentUserSource.next(null!);
      return of(null);
    }

    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);

    return this.http.get<IUser>(this.baseUrl + 'account', {headers}).pipe(
      map(user => {
        if (user) {
          localStorage.setItem('token', user.token);
          this.currentUserSource.next(user);
          return user;
        } else {
          return null;
        }
      })
    )
  }

  login(values: any) {
    return this.http.post<IUser>(this.baseUrl + 'Account/login', values).pipe(
      map((user: IUser) => {
        if (user) {
          localStorage.setItem('token', user.token);
          this.currentUserSource.next(user);
        }
      })
    );
  }


  register(values: any) {
    return this.http.post<IUser>(this.baseUrl + 'Account/register', values).pipe(
      map((user: IUser) => {
        if (user) {
          localStorage.setItem('token', user.token);
          this.currentUserSource.next(user);
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.currentUserSource.next(null!);
    this.router.navigateByUrl('/');
  }

  checkEmailExsits(email: string) {
    return this.http.get<IUser>(this.baseUrl + 'Account/emailexists?email=' + email);
  }

  getUserAddress() {
    return this.http.get<IAddress>(this.baseUrl + 'Account/address');
  }

  updateUserAddress(address: IAddress) {
    return this.http.put(this.baseUrl + 'Account/address', address);
  }
}



