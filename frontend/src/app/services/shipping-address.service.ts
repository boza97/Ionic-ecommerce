import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, of } from 'rxjs';
import { take, delay, tap, switchMap, map } from 'rxjs/operators';
import { ShippingAddress } from '../common/shippingAddress';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

export interface ShippingAdressData {
  shippingAddress?: ShippingAddress,
  status: string
}

@Injectable({
  providedIn: 'root'
})
export class ShippingAddressService {
  private _shippingAddress = new BehaviorSubject<ShippingAddress>(null);
  private readonly apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private authService: AuthService) { }

  get shippingAddress() {
    return this._shippingAddress.asObservable();
  }

  fetchShippingAddress() {
    let userId: number;
    return this.authService.user.pipe(
      take(1),
      switchMap(user => {
        if (user) {
          userId = user.user_id;
          return this.http.get<ShippingAdressData>(this.apiUrl + 'shipping-addresses',
            { headers: new HttpHeaders().set('Authorization', user.token) });
        } else {
          return of(null);
        }
      }),
      map(response => {
        const shippingAddress = response.shippingAddress;
        shippingAddress.user_id = userId;
        return shippingAddress;
      }),
      tap(shippingAddress => {
        this._shippingAddress.next(shippingAddress);
      })
    );
  }

  updateShippingInfo(city: string, cityCode: number, address: string, phone: string, shippingAddress: ShippingAddress) {
    return this.authService.user.pipe(
      take(1),
      switchMap(user => {
        if (user) {
          return this.http.patch<ShippingAdressData>(this.apiUrl + 'shipping-addresses',
            { city: city, cityCode: cityCode, address: address, phone: phone },
            { headers: new HttpHeaders().set('Authorization', user.token) });
        } else {
          return of(null);
        }
      }),
      tap(response => {
        if (response) {
          shippingAddress.city = city;
          shippingAddress.city_code = cityCode;
          shippingAddress.address = address;
          shippingAddress.phone = phone;
          this._shippingAddress.next(shippingAddress);
        } else {
          throw new Error();
        }
      })
    );
  }
}
