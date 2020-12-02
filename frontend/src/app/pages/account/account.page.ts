import { Component, OnInit, OnDestroy } from "@angular/core";
import { LoadingController, AlertController } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Subscription } from 'rxjs';
import { ShippingAddress } from '../../common/shippingAddress';
import { ShippingAddressService } from '../../services/shipping-address.service';
import { Router } from '@angular/router';
import { User } from 'src/app/common/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: "app-account",
  templateUrl: "./account.page.html",
  styleUrls: ["./account.page.scss"],
})
export class AccountPage implements OnInit, OnDestroy {
  form: FormGroup;
  shippingAddress: ShippingAddress;
  user: User;
  isLoading = false;
  private shippingAddressSub: Subscription;
  private userSub: Subscription;

  constructor(
    private shippingAddressService: ShippingAddressService,
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private router: Router,
    private alertCtrl: AlertController) { }

  ngOnInit() {
    this.isLoading = true;
    this.shippingAddressSub = this.shippingAddressService.shippingAddress.subscribe(info => {
      this.shippingAddress = info;
      this.isLoading = false;
      this.createForm();
    });

    this.userSub = this.authService.user.subscribe(user => {
      this.user = user;
    });
  }

  ngOnDestroy(): void {
    if (this.shippingAddressSub) {
      this.shippingAddressSub.unsubscribe();
    }
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.shippingAddressService.fetchShippingAddress().subscribe(
      () => { },
      error => {
        this.alertCtrl
          .create({
            header: 'Greška',
            message: 'Došlo je do greške prilikom preuzimanja podataka.',
            buttons: [{
              text: 'Ok',
              handler: () => {
                this.router.navigateByUrl('/home');
              }
            }]
          })
          .then(alertEl => alertEl.present());
      }
    );
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    this.loadingCtrl
      .create({
        message: 'Čuvanje...'
      })
      .then(loadingEl => {
        loadingEl.present();
        this.shippingAddressService.updateShippingInfo(
          this.form.get('city').value,
          +this.form.get('cityCode').value,
          this.form.get('address').value,
          this.form.get('mobileNumber').value,
          this.shippingAddress
        ).subscribe(
          () => {
            loadingEl.dismiss();
            this.alertCtrl
              .create({
                header: 'Uspešno',
                message: 'Podaci su izmenjeni.',
                buttons: ['Ok']
              })
              .then(alertEl => alertEl.present());
          },
          error => {
            this.alertCtrl
              .create({
                header: 'Greška',
                message: 'Došlo je do greške prilikom ažuriranja podataka.',
                buttons: [{
                  text: 'Ok',
                  handler: () => {
                    this.router.navigateByUrl('/home');
                  }
                }]
              })
              .then(alertEl => alertEl.present());
          });
      });
  }

  createForm() {
    this.form = new FormGroup({
      city: new FormControl(this.shippingAddress ? this.shippingAddress.city : null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.pattern(/^[A-Za-z ]+$/)]
      }),
      cityCode: new FormControl(this.shippingAddress ? this.shippingAddress.city_code : NaN, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.pattern(/^[1-9][0-9]{4}$/)]
      }),
      address: new FormControl(this.shippingAddress ? this.shippingAddress.address : null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      mobileNumber: new FormControl(this.shippingAddress ? this.shippingAddress.phone : null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.pattern(/^06[0-9]\/[0-9]{6}[0-9]?$/)]
      })
    });
  }
}
