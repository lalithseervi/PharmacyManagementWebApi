import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { medicine } from 'src/app/models/medicine';
import { CommonservicesService } from 'src/app/services/commonservices.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-medicine',
  templateUrl: './medicine.component.html',
  styleUrls: ['./medicine.component.css']
})
export class MedicineComponent implements OnInit{

  record = new medicine();

  constructor(private _service : CommonservicesService, private snackBar : MatSnackBar, private loadingService : LoadingService) { }

  ngOnInit(): void {
    this.loadingService.showLoading();
    setTimeout(() => {
      console.log('Task completed');
      this.loadingService.hideLoading();
    }, 1000);
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
