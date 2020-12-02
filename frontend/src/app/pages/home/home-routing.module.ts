import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: HomePage,
    children: [
      {
        path: 'featured',
        loadChildren: () => import('./featured/featured.module').then( m => m.FeaturedPageModule)
      },
      {
        path: 'cart',
        loadChildren: () => import('./cart/cart.module').then( m => m.CartPageModule)
      },
      {
        path: '',
        redirectTo: '/home/tabs/featured',
        pathMatch: 'full'
      }  
    ]
  },
  {
    path: '',
    redirectTo: '/home/tabs/featured',
    pathMatch: 'full'
  }  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
