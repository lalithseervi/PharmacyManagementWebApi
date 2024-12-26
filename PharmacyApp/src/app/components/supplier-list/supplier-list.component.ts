import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonservicesService } from 'src/app/services/commonservices.service';

@Component({
  selector: 'app-supplier-list',
  templateUrl: './supplier-list.component.html',
  styleUrls: ['./supplier-list.component.css']
})
export class SupplierListComponent implements OnInit{
  ngOnInit(): void {
    this.GetSupplier();
  }
  displayedColumns: string[] = ['id', 'name', 'contact', 'address', 'actions'];
  supplier: any[] = [];

  constructor(private _service : CommonservicesService, private snackBar : MatSnackBar) { } 

  GetSupplier()
  {
    this._service.GetSupplier().subscribe({
      next: (data: any) =>{
        console.log(data);
        this.supplier=data;
      },
      error: (err: any) =>{
        console.log("Error Occured");
      }
    });
  }

  updateSupplier(supplier: any): void {
    this._service.UpdateSupplier(supplier.id, supplier).subscribe(() => {
      alert('Supplier details updated successfully!');
    });
  }

  deleteSupplier(id: number): void {
    if (confirm('Are you sure you want to delete this supplier details?')) {
      this._service.DeleteSupplier(id).subscribe(() => {
        this.GetSupplier();
        alert('Medicine deleted successfully!');
      });
    }
  }
}
