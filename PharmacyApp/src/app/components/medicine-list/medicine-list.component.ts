import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CommonservicesService } from 'src/app/services/commonservices.service';

@Component({
  selector: 'app-medicine-list',
  templateUrl: './medicine-list.component.html',
  styleUrls: ['./medicine-list.component.css']
})
export class MedicineListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'description', 'price', 'quantity', 'expiryDate', 'actions'];
  medicines: any[] = [];
  filteredMedicines = new MatTableDataSource<any>();
  searchTerm: string = '';

  constructor(private _service : CommonservicesService) { }
  
  ngOnInit(): void {
    this.fetchMedicines();
  }
  
  fetchMedicines()
  {
    this._service.GetMedicine().subscribe((data) => {
      this.medicines = data;
      this.filteredMedicines.data = data;
    });
  }

  applyFilter(): void {
    this.filteredMedicines.data = this.medicines.filter((medicine) =>
      medicine.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  updateMedicine(medicine: any): void {
    this._service.UpdateMedicine(medicine.id, medicine).subscribe(() => {
      alert('Medicine updated successfully!');
    });
  }

  deleteMedicine(id: number): void {
    if (confirm('Are you sure you want to delete this medicine?')) {
      this._service.DeleteMedicine(id).subscribe(() => {
        this.fetchMedicines();
        alert('Medicine deleted successfully!');
      });
    }
  }
}
