import { NavController, AlertController } from '@ionic/angular';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from '../../../common/product';
import { Category } from '../../../common/category';
import { ProductService } from '../../../services/product.service';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-products-by-category',
  templateUrl: './products-by-category.page.html',
  styleUrls: ['./products-by-category.page.scss'],
})
export class ProductsByCategoryPage implements OnInit, OnDestroy {
  category: Category;
  loadedProducts: Product[];
  productsSub: Subscription;
  isLoading = false;

  constructor(private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private alertCtrl: AlertController) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('categoryId')) {
        this.navCtrl.navigateBack('categories');
        return;
      }
      const categoryId = +paramMap.get('categoryId');

      this.isLoading = true;
      this.productsSub = this.productService.getProductsByCategory(categoryId).subscribe(products => {
        this.loadedProducts = products;
        if (this.loadedProducts.length != 0) {
          this.category = this.loadedProducts[0].category;
        }
        this.isLoading = false;
      },
        error => {
          this.alertCtrl
            .create({
              header: 'Greška',
              message: 'Nije moguće prikazati proizvode',
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

  ionViewWillEnter() {
    if (this.category) {
      this.isLoading = true;
      this.productService.getProductsByCategory(this.category.category_id).subscribe(
        () => { },
        error => {
          this.alertCtrl
            .create({
              header: 'Greška',
              message: 'Nije moguće prikazati proizvode',
              buttons: [{
                text: 'Ok',
                handler: () => {
                  this.navCtrl.navigateBack('categories');
                }
              }]
            })
            .then(alertEl => alertEl.present());
        }
      );
    }
  }

  ngOnDestroy(): void {
    if (this.productsSub) {
      this.productsSub.unsubscribe();
    }
  }

  onAddToCart(product: Product) {
    this.cartService.addToCart(product).subscribe(() => {
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

  onDetails(id: number) {
    this.navCtrl.navigateForward('categories/' + this.category.category_id + '/product-details/' + id);
  }

}
