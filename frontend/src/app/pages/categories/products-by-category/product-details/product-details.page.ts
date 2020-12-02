import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { NavController, AlertController } from '@ionic/angular';
import { CartService } from 'src/app/services/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
})
export class ProductDetailsPage implements OnInit {
  product: Product;
  productSub: Subscription;
  isLoading = false;

  constructor(private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private alertCtrl: AlertController) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('productId')) {
        this.navCtrl.navigateBack('categories');
        return;
      }

      this.isLoading = true;
      this.productSub = this.productService.getProduct(+paramMap.get('productId')).subscribe(product => {
        this.product = product;
        this.isLoading = false;
      },
        error => {
          this.alertCtrl
            .create({
              header: 'Greška',
              message: 'Nije moguće prikazati proizvod',
              buttons: [{
                text: 'Ok',
                handler: () => {
                  this.navCtrl.navigateBack('categories');
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
