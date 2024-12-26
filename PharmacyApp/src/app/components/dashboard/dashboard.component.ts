import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonservicesService } from 'src/app/services/commonservices.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  totalSales: number = 0;
  totalInventory: number = 0;
  totalSuppliers: number = 0;

  record : any[] = [];
  record1 : any[] = [];

  constructor(private router: Router, private _service : CommonservicesService) {}

  ngOnInit(): void {
    // Mock data - Replace with API calls for live data
    // this.totalSales = 150; // Replace with backend data
    // this.totalInventory = 500; // Replace with backend data
    // this.totalSuppliers = 25; // Replace with backend data

    this.fetchsales();
    this.fetchInventory();
    this.fetchSuppliers();
  }

  fetchsales()
  {
    this._service.GetSales().subscribe((data) => {
      console.log(data);
      this.record = data;
      this.calculateTotalSales();
    });
  }

  calculateTotalSales() {
    this.totalSales = this.record.reduce((total, sale) => {
      // Assuming the amount field holds the price of each sale, replace 'amount' with the actual property name
      return total + (sale.totalPrice || 0);
    }, 0);
  }

  fetchInventory()
  {
    this._service.GetMedicine().subscribe((data) => {
      console.log(data);
      this.record1 = data;
      this.calculateTotalInventory();
    });
  }

  calculateTotalInventory() {
    this.totalInventory = this.record1.length;
  }

  fetchSuppliers()
  {
    this._service.GetSupplier().subscribe((data) => {
      console.log(data);
      this.record = data;
      this.calculateTotalSuppliers();
    });
  }

  calculateTotalSuppliers() {
    this.totalSuppliers = this.record.length;
  }

  navigateTo(route: string): void {
    this.router.navigate([`/${route}`]);
  }

  logout(): void {
    alert('Logged out!');
    this.router.navigate(['/login']);
  }

}
