import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { medicine } from 'src/app/models/medicine';
import { CommonservicesService } from 'src/app/services/commonservices.service';

@Component({
  selector: 'app-medicine',
  templateUrl: './medicine.component.html',
  styleUrls: ['./medicine.component.css']
})
export class MedicineComponent implements OnInit{

  record = new medicine();

  constructor(private _service : CommonservicesService, private snackBar : MatSnackBar) { }

  ngOnInit(): void {
    
  }
  
  addmeds()
  {
    this._service.PostMedicine(this.record).subscribe({
      next: (data: any) =>{
        console.log(data);
        this.snackBar.open('Medicine added Successfully','Close', {duration: 3000});
        this.record=new medicine();
      },
      error: (err: any) =>{
        console.log("Error Occured");
        this.snackBar.open('Error Occured','Close', {duration: 3000});
      }
    });
  }
}
