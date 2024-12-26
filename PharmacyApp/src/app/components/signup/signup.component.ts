import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { admin } from 'src/app/models/admin';
import { CommonservicesService } from 'src/app/services/commonservices.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  record = new admin();

  constructor(private router : Router, private _service : CommonservicesService, private snackBar : MatSnackBar){
  
    }
  
    ngOnInit(): void {
     
    }

  signup()
  {
    this._service.PostSignup(this.record).subscribe({
      next: (data: any) =>{
        console.log(data);
        // this.snackBar.open('Signup successful','Close', {duration: 3000});
        alert('Signup successful! Please log in.');
        this.router.navigate(['/']);
      },
      error: (err: any) =>{
        console.log("Error Occured");
        this.snackBar.open('Error Occured','Close', {duration: 3000});
      }
    });
  }
}
