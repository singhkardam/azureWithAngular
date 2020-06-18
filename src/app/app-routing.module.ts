import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './components/index/index.component';
import { ProductDescriptionComponent } from './components/product-description/product-description.component';
import { MsalGuard } from '@azure/msal-angular';

const routes: Routes = [
  {
    path:'',
    component: IndexComponent
  },
  {
    path:'description/:i',
    component: ProductDescriptionComponent,
    canActivate: [MsalGuard],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
