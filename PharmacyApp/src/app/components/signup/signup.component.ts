import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { admin } from 'src/app/models/admin';
import { CommonservicesService } from 'src/app/services/commonservices.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  record = new admin();

  constructor(private router : Router, private _service : CommonservicesService, private snackBar : MatSnackBar,private loadingService : LoadingService){
  
    }
  
    ngOnInit(): void {
      this.loadingService.showLoading();
      setTimeout(() => {
        console.log('Task completed');
        this.loadingService.hideLoading();
      }, 1000);
    }

  signup()
  {
    this._service.PostSignup(this.record).subscribe({
      next: (data: any) =>{
        console.log(data);
        // this.snackBar.open('Signup successful','Close', {duration: 3000});
        alert('Signup successful! Please log in.');
        this.router.navigate(['/login']);
      },
      error: (err: any) =>{
        console.log("Error Occured");
        this.snackBar.open('Error Occured','Close', {duration: 3000});
      }
    });
  }
}
