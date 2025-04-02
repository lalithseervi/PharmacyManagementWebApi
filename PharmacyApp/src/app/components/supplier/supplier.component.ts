import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { supplier } from 'src/app/models/supplier';
import { CommonservicesService } from 'src/app/services/commonservices.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent implements OnInit {

    ngOnInit(): void {
      this.loadingService.showLoading();
    setTimeout(() => {
      console.log('Task completed');
      this.loadingService.hideLoading();
    }, 1000);
    }

    constructor(private _service : CommonservicesService, private snackBar : MatSnackBar,private loadingService : LoadingService) { } 

    record = new supplier();

    save()
    {
      this._service.PostSupplier(this.record).subscribe({
            next: (data: any) =>{
              console.log(data);
              this.snackBar.open('Supplier details added Successfully','Close', {duration: 3000});
            },
            error: (err: any) =>{
              console.log("Error Occured");
              this.snackBar.open('Error Occured','Close', {duration: 3000});
            }
          });
    }
}
