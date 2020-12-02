import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FeaturedPage } from './featured.page';

const routes: Routes = [
  {
    path: '',
    component: FeaturedPage    
  },
  {
    path: 'product-detail/:productId',
    loadChildren: () => import('./featured-product-details/featured-product-details.module').then( m => m.FeaturedProductDetailsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeaturedPageRoutingModule {}
