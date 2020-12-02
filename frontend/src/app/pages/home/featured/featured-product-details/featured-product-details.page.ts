import { NavController, AlertController } from '@ionic/angular';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from '../../../../common/product';
import { ProductService } from '../../../../services/product.service';
import { CartService } from '../../../../services/cart.service';

@Component({
  selector: 'app-featured-product-details',
  templateUrl: './featured-product-details.page.html',
  styleUrls: ['./featured-product-details.page.scss'],
})
export class FeaturedProductDetailsPage implements OnInit, OnDestroy {
  product: Product;
  productSub: Subscription;
  isLoading = false;

  constructor(private productService: ProductService,
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private cartService: CartService,
    private alertCtrl: AlertController) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('productId')) {
        this.navCtrl.navigateBack('home/tabs/featured');
        return;
      }

      this.isLoading = true;
      this.productSub = this.productService.getProduct(+paramMap.get('productId')).subscribe(product => {
        this.product = product;
        this.isLoading = false;
      },
        error => {
          this.isLoading = false;
          this.alertCtrl
            .create({
              header: 'Greška',
              message: 'Nije moguće prikazati proizvod',
              buttons: [{
                text: 'Ok',
                handler: () => {
                  this.navCtrl.navigateBack('home/tabs/featured');
                }
              }]
            })
            .then(alertEl => alertEl.present());
        });
    });
  }

  ngOnDestroy(): void {
    if (this.productSub) {
      this.productSub.unsubscribe();
    }
  }

  onAddToCart() {
    this.cartService.addToCart(this.product).subscribe(() => {
      this.alertCtrl
        .create({
          header: 'Uspešno',
          message: 'Proizvod dodat u korpu',
          buttons: ['Ok']
        })
        .then(alertEl => alertEl.present());
    },
      error => {
        this.alertCtrl
          .create({
            header: 'Greška',
            message: error.message,
            buttons: ['Ok']
          })
          .then(alertEl => alertEl.present());
      });
  }

}
