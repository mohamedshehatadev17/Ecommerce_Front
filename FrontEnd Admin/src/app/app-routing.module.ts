import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllProductsComponent } from './components/Products/all-products/all-products.component';
import { OrdersComponent } from './components/Orders/orders.component';
import { AddCategoryComponent } from './components/Add_Category/add-category.component';
import { CategoryListComponent } from './components/category-list/category-list.component';

const routes: Routes = [
  {path:"",component:AllProductsComponent},
  { path: 'products', component: AllProductsComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'categories', component: CategoryListComponent },
  { path: 'Addcategories', component: AddCategoryComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
