import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductsByCategoryPage } from './products-by-category.page';

const routes: Routes = [
  {
    path: '',
    component: ProductsByCategoryPage
  },
  {
    path: 'product-details/:productId',
    loadChildren: () => import('./product-details/product-details.module').then( m => m.ProductDetailsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsByCategoryPageRoutingModule {}
