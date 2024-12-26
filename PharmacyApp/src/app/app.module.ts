import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatInputModule } from '@angular/material/input';  
import { MatButtonModule } from '@angular/material/button';  
import { MatCardModule } from '@angular/material/card';  
import { MatFormFieldModule } from '@angular/material/form-field';  
import { FormsModule } from '@angular/forms';

import {MatTableModule} from '@angular/material/table';
import {MatSelectModule} from '@angular/material/select';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { LoginComponent } from './components/login/login.component';
import { MedicineComponent } from './components/medicine/medicine.component';
import { MedicineListComponent } from './components/medicine-list/medicine-list.component';
import { ReportsComponent } from './components/reports/reports.component';
import { SaleComponent } from './components/sale/sale.component';
import { SaleListComponent } from './components/sale-list/sale-list.component';
import { SignupComponent } from './components/signup/signup.component';
import { SupplierComponent } from './components/supplier/supplier.component';
import { SupplierListComponent } from './components/supplier-list/supplier-list.component';
import { NgChartsModule } from 'ng2-charts';
import { LandingComponent } from './components/landing/landing.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoadingComponent } from './components/loading/loading.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    InventoryComponent,
    LoginComponent,
    MedicineComponent,
    MedicineListComponent,
    ReportsComponent,
    SaleComponent,
    SaleListComponent,
    SignupComponent,
    SupplierComponent,
    SupplierListComponent,
    LandingComponent,
    HeaderComponent,
    FooterComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatTableModule,
    MatSelectModule,
    MatNativeDateModule,
    MatOptionModule,
    MatDatepickerModule,
    MatDividerModule,
    CommonModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatGridListModule,
    MatSidenavModule,
    MatListModule,
    NgChartsModule,
    MatIconModule,
    MatTooltipModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
