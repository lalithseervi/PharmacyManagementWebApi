import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { supplier } from 'src/app/models/supplier';
import { CommonservicesService } from 'src/app/services/commonservices.service';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent implements OnInit {

    ngOnInit(): void {
      
    }

    constructor(private _service : CommonservicesService, private snackBar : MatSnackBar) { } 

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
