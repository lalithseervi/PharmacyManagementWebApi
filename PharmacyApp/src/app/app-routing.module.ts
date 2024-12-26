import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { MedicineComponent } from './components/medicine/medicine.component';
import { MedicineListComponent } from './components/medicine-list/medicine-list.component';
import { ReportsComponent } from './components/reports/reports.component';
import { SaleComponent } from './components/sale/sale.component';
import { SaleListComponent } from './components/sale-list/sale-list.component';
import { SignupComponent } from './components/signup/signup.component';
import { SupplierComponent } from './components/supplier/supplier.component';
import { SupplierListComponent } from './components/supplier-list/supplier-list.component';
import { LandingComponent } from './components/landing/landing.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'inventory', component: InventoryComponent },
  { path: 'medicine', component: MedicineComponent },
  { path: 'medicine-list', component: MedicineListComponent },
  { path: 'reports', component: ReportsComponent },
  { path: 'sale', component: SaleComponent },
  { path: 'sale-list', component: SaleListComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'supplier', component: SupplierComponent },
  { path: 'supplier-list', component: SupplierListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
