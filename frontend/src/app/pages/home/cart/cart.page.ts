import {
  ModalController,
  ActionSheetController,
  LoadingController,
  AlertController,
} from "@ionic/angular";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from '@angular/router';
import { Subscription } from "rxjs";
import { CheckoutComponent } from "./checkout/checkout.component";
import { OrderItem } from "../../../common/orderItem";
import { CartService } from "../../../services/cart.service";
import { OrderService } from '../../../services/order.service';

@Component({
  selector: "app-cart",
  templateUrl: "./cart.page.html",
  styleUrls: ["./cart.page.scss"],
})
export class CartPage implements OnInit, OnDestroy {
  loadededItems: OrderItem[];
  total: string;
  isLoading = false;
  private cartSub: Subscription;

  constructor(
    private cartService: CartService,
    private modalCtrl: ModalController,
    private actionSheetCtrl: ActionSheetController,
    private loadingCtrl: LoadingController,
    private orderService: OrderService,
    private router: Router,
    private alertCtrl: AlertController) { }

  ngOnInit() {
    this.isLoading = true;
    this.cartSub = this.cartService.cart.subscribe((cartItems) => {
      this.loadededItems = cartItems;
      this.isLoading = false;
      if (this.loadededItems.length > 0) {
        this.calculateTotal();
      }
    },
      error => {
        this.showAlert('Greška prilikom učitavanja podataka.');
      });
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.cartService.fetchCart().subscribe(
      () => { },
      error => {
        this.isLoading = false;
        this.showAlert('Greška prilikom učitavanja podataka.');
      }
    );
  }

  ngOnDestroy(): void {
    if (this.cartSub) {
      this.cartSub.unsubscribe();
    }
  }

  toCheckout() {
    if (this.loadededItems && this.loadededItems.length < 1) {
      return;
    }

    this.actionSheetCtrl
      .create({
        header: "Izaberite akciju",
        buttons: [
          {
            text: "Moji podaci",
            handler: () => {
              this.openCheckoutModal("existing");
            },
          },
          {
            text: "Drugi podaci",
            handler: () => {
              this.openCheckoutModal("other");
            },
          },
          {
            text: "Otkaži",
            role: "cancel",
          },
        ],
      })
      .then((actionSheetEl) => {
        actionSheetEl.present();
      });
  }

  openCheckoutModal(mode: "other" | "existing") {
    this.modalCtrl
      .create({
        component: CheckoutComponent,
        componentProps: { total: this.total, selectedMode: mode },
      })
      .then((modalEl) => {
        modalEl.present();
        return modalEl.onDidDismiss();
      })
      .then((resultData) => {
        if (resultData.role === 'confirm') {
          this.loadingCtrl
            .create({
              message: 'Naručivanje...'
            })
            .then(loadingEl => {
              loadingEl.present();
              const data = resultData.data.orderData;
              this.orderService.placeOrder(
                data.contactName,
                data.city,
                data.cityCode.toString(),
                data.address,
                data.phone
              ).subscribe(
                () => {
                  loadingEl.dismiss();
                  this.router.navigateByUrl('/orders');
                  this.cartService.clearCart().subscribe();
                },
                error => {
                  loadingEl.dismiss();
                  this.showAlert('Došlo je do greške prilikom naručivanja.');
                });
            });
        }
      });
  }

  onDeleteFromCart(id: number) {
    this.cartService.deleteFromCart(id).subscribe();
  }

  decreaseCartItem(id: number) {
    this.cartService.decreaseOrderItem(id).subscribe();
  }

  increaseCartItem(id: number) {
    this.cartService.increaseOrderItem(id).subscribe();
  }

  calculateTotal() {
    let sum = 0;
    this.loadededItems.forEach((item) => (sum += item.amount));
    this.total = sum.toFixed(2);
  }

  private showAlert(message: string) {
    this.alertCtrl
      .create({
        header: 'Greška',
        message: message,
        buttons: ['Ok']
      })
      .then(alertEl => alertEl.present());
  }
}
