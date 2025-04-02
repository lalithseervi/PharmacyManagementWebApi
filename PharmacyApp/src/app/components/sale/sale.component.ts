import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { sale } from 'src/app/models/sale';
import { CommonservicesService } from 'src/app/services/commonservices.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.css']
})
export class SaleComponent implements OnInit {

  record = new sale();
  dtmedicine: any[] = [];
  availableQuantity: number | null = null;
  quantityError: string | null = null;
  // totalPrice: number = 0;

  constructor(private _service : CommonservicesService, private snackBar : MatSnackBar, private loadingService : LoadingService) { }

  ngOnInit(): void {
    this.loadingService.showLoading();
    setTimeout(() => {
      console.log('Task completed');
      this.loadingService.hideLoading();
    }, 1000);

    this._service.GetMedicine().subscribe({
      next: (data: any) =>{
        console.log(data);
        this.dtmedicine=data;
      },
      error: (err: any) =>{
        console.log("Error Occured");
      }
    });
  }

  updateAvailableQuantity(medicineId: number): void {
    const selectedMedicine = this.dtmedicine.find(med => med.id === medicineId);
    this.availableQuantity = selectedMedicine ? selectedMedicine.quantity : null;
    this.validateQuantity();
  }

  validateQuantity(): void {
    console.log('Available Quantity:', this.availableQuantity);
    console.log('Quantity Sold:', this.record.quantitySold);
    if (this.record.quantitySold && this.availableQuantity !== null && this.record.quantitySold > this.availableQuantity) {
      this.quantityError = 'Quantity Sold cannot exceed Available Quantity';
    } else {
      this.quantityError = null;
    }
    console.log('Quantity Error:', this.quantityError);
  }

  calculateTotalPrice()
   {
    const selectedMedicine = this.dtmedicine.find(med => med.id === this.record.medicineId);
    if (selectedMedicine) {
      this.record.totalPrice = selectedMedicine.price * this.record.quantitySold;
    }
   }

  postsale()
  {
    const selectedMedicine = this.dtmedicine.find(med => med.id === this.record.medicineId);
    if (selectedMedicine && selectedMedicine.quantity >= this.record.quantitySold) {
    this._service.PostSale(this.record).subscribe({
          next: (data: any) =>{
            console.log(data);
            this.snackBar.open('Sale posted Successfully','Close', {duration: 3000});
            this.record=new sale();
          },
          error: (err: any) =>{
            console.log("Error Occured");
            this.snackBar.open('Error Occured','Close', {duration: 3000});
          }
        });
      }else {
        console.error('Invalid sale: Not enough stock.');
      }
  }
  

  // postSale(): void {
  //   // Get the current quantity of the medicine from the `dtmedicine` list
  //   const selectedMedicine = this.dtmedicine.find(med => med.id === this.record.medicineId);
  
  //   // If medicine exists and the quantity is valid
  //   if (selectedMedicine && selectedMedicine.quantity >= this.record.quantitySold) {
  //     this._service.PostSales(this.record).subscribe(
  //       (response) => {
  //         console.log('Sale posted successfully.');
  
  //         // Update the medicine stock by subtracting the sold quantity
  //         // this._service.UpdateMedicines(this.record.medicineId, this.record.quantitySold).subscribe(
  //         //   (inventoryResponse) => {
  //         //     console.log('Inventory updated successfully.');
  //         //     // Handle success (e.g., show success message)
  //         //   },
  //         //   (error) => {
  //         //     console.error('Error updating inventory:', error);
  //         //     // Handle error (e.g., show error message)
  //         //   }
  //         // );
  //       },
  //       (error) => {
  //         console.error('Error posting sale:', error);
  //         // Handle error posting the sale
  //       }
  //     );
  //   } else {
  //     console.error('Invalid sale: Not enough stock.');
  //     // Handle the error (e.g., show an error message)
  //   }
  // }
  
  



  // updateInventory(): void {
  //   this._service.UpdateMedicine(this.medicineId, this.quantitySold).subscribe(
  //     (response) => {
  //       console.log('Inventory updated successfully', response);
  //     },
  //     (error) => {
  //       console.error('Error updating inventory', error);
  //     }
  //   );
  // }
}
