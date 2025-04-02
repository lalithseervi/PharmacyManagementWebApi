import { Component, OnInit } from '@angular/core';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import { sale } from 'src/app/models/sale';
import { CommonservicesService } from 'src/app/services/commonservices.service';
import { LoadingService } from 'src/app/services/loading.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-sale-list',
  templateUrl: './sale-list.component.html',
  styleUrls: ['./sale-list.component.css']
})
export class SaleListComponent implements OnInit {
  record : sale[] = [];
  filteredSales: sale[] = [];
  fromDate!: Date | null;
  toDate!: Date | null;
  displayedColumns: string[] = ['id', 'customerName', 'medicineId', 'quantitySold', 'totalPrice', 'saleDate'];

  constructor(private _service : CommonservicesService,private loadingService : LoadingService) { }

  ngOnInit(): void {
    this.loadingService.showLoading();
    setTimeout(() => {
      console.log('Task completed');
      this.loadingService.hideLoading();
    }, 1000);

    this.fetchsales();
  }

  fetchsales()
  {
    this._service.GetSales().subscribe((data) => {
      console.log(data);
      this.record = data;
      this.filteredSales=data;  
    });

    // this.filteredSales = [...this.record];
  }

  applyDateFilter(): void {
    if (!this.fromDate || !this.toDate) {
      this.filteredSales = [...this.record];
    } else {
      this.filteredSales = this.record.filter(sale => {
        const saleDate = new Date(sale.saleDate).getTime();
        return saleDate >= this.fromDate!.getTime() && saleDate <= this.toDate!.getTime();
      });
    }
  }

  exportToPDF(): void {
    const doc = new jsPDF.default();
    doc.text('Sales Report', 14, 10);
    (doc as any).autoTable({
      head: [['ID', 'Medicine ID', 'Quantity Sold', 'Total Price', 'Sale Date', 'Customer Name']],
      body: this.filteredSales.map(sale => [
        sale.id,
        sale.medicineId,
        sale.quantitySold,
        sale.totalPrice,
        new Date(sale.saleDate).toLocaleDateString(), // Ensure the date is converted to a Date object
        sale.customerName
      ]),
    });
    doc.save('sales-report.pdf');
  }
  

  exportToExcel(): void {
    const worksheet = XLSX.utils.json_to_sheet(this.filteredSales);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sales');
    XLSX.writeFile(workbook, 'sales-report.xlsx');
  }
}
