import { Injectable, OnDestroy } from '@angular/core';
import { User } from '../common/user';
import { BehaviorSubject, from } from 'rxjs';
import { take, tap, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Plugins } from "@capacitor/core";

export interface SignUpResponseData {
  message: string,
  status: string
}

export interface LoginResponseData {
  expiresIn: number,
  status: string,
  token: string
  user: {
    email: string,
    firstname: string,
    lastname: string,
    userId: number
  }
}

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {
  private _user = new BehaviorSubject<User>(null);
  private readonly apiUrl = environment.apiUrl;
  private activeLogoutTimer: any;

  constructor(
    private http: HttpClient) { }

  ngOnDestroy(): void {
    if (this.activeLogoutTimer)
      clearTimeout(this.activeLogoutTimer);
  }

  get user() {
    return this._user.asObservable();
  }

  get userIsAuthenticated() {
    return this.user.pipe(
      map(user => {
        if (user)
          return !!user.token;
        else
          return false;
      }));
  }

  get userId() {
    return this.user.pipe(
      map(user => {
        if (user)
          return user.user_id
        else
          return null;
      })
    );
  }


  autoLogin() {
    return from(Plugins.Storage.get({ key: 'userData' }))
      .pipe(
        map(userData => {
          if (!userData || !userData.value) {
            return null;
          }
          const parsedData = JSON.parse(userData.value) as {
            userId: number,
            token: string,
            firstname: string,
            lastname: string,
            email: string,
            tokenExpirationDate: string
          };

          const expirationTime = new Date(parsedData.tokenExpirationDate);
          if (expirationTime <= new Date()) {
            return null;
          }

          const user = new User(
            parsedData.userId,
            parsedData.firstname,
            parsedData.lastname,
            parsedData.email,
            parsedData.token,
            expirationTime
          );
          return user;
        }),
        tap(user => {
          if (user) {
            this._user.next(user);
            this.autoLogout(user.tokenDuration);
          }
        }),
        map(user => !!user)
      );
  }

  logout() {
    return this.userId.pipe(take(1), tap(userId => {
      if (userId) {
        if (this.activeLogoutTimer) {
          clearTimeout(this.activeLogoutTimer);
        }
        Plugins.Storage.remove({ key: 'cart' + userId });
        this._user.next(null);
        Plugins.Storage.remove({ key: 'userData' });
      }
    }));
  }

  private autoLogout(duration: number) {
    if (this.activeLogoutTimer) {
      clearTimeout(this.activeLogoutTimer);
    }
    this.activeLogoutTimer = setTimeout(() => {
      this.logout().subscribe();
    }, duration);
  }


  signup(firstName: string, lastName: string, email: string, password: string, confirmPassword: string) {
    return this.http.post<SignUpResponseData>(this.apiUrl + 'register',
      { firstname: firstName, lastname: lastName, email: email, password: password, confirmPassword: confirmPassword });
  }

  login(email: string, password: string) {
    return this.http.post<LoginResponseData>(this.apiUrl + 'login',
      { email: email, password: password })
      .pipe(tap(this.setUserData.bind(this)));
  }

  private setUserData(userData: LoginResponseData) {
    const expirationDate = new Date(new Date().getTime() + (+userData.expiresIn * 1000));
    const user = new User(
      userData.user.userId,
      userData.user.firstname,
      userData.user.lastname,
      userData.user.email,
      userData.token,
      expirationDate
    );

    this._user.next(user);
    this.autoLogout(user.tokenDuration);
    this.storeAuthData(
      user.user_id,
      userData.token,
      user.firstName,
      user.lastName,
      user.email,
      expirationDate.toISOString()
    );
  }

  private storeAuthData(userId: number, token: string, firstName: string, lastName: string, email: string, tokenExpirationDate: string) {
    const data = JSON.stringify({ userId: userId, token: token, firstname: firstName, lastname: lastName, email: email, tokenExpirationDate: tokenExpirationDate });
    Plugins.Storage.set({ key: 'userData', value: data });
  }
}
