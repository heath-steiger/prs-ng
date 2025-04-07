import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { VendorCreateComponent } from './feature/vendor/vendor-create/vendor-create.component';
import { VendorListComponent } from './feature/vendor/vendor-list/vendor-list.component';
import { VendorDetailComponent } from './feature/vendor/vendor-detail/vendor-detail.component';
import { VendorEditComponent } from './feature/vendor/vendor-edit/vendor-edit.component';
import { ProductListComponent } from './feature/product/product-list/product-list.component';
import { ProductCreateComponent } from './feature/product/product-create/product-create.component';

const routes: Routes = [
  { path:'', redirectTo: '/vendor-list', pathMatch: 'full'},
  { path:'vendor-list', component: VendorListComponent},
  { path:'vendor-create', component: VendorCreateComponent},
  { path:'vendor-edit/:id', component: VendorEditComponent},
  { path:'vendor-detail/:id', component: VendorDetailComponent},
  { path:'product-list', component: ProductListComponent},
  { path:'product-create', component: ProductCreateComponent},
  { path:'**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
