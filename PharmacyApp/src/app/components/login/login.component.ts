import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { admin } from 'src/app/models/admin';
import { CommonservicesService } from 'src/app/services/commonservices.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  record = new admin();

  constructor(private router : Router, private _service : CommonservicesService, private snackBar : MatSnackBar){

  }

  ngOnInit(): void {
   
  }

  login()
  {
    this._service.validateLogin(this.record.username, this.record.password).subscribe({
      next: (data : any) => {
        if(data.ok == 200){
          this.snackBar.open('Login Successful!!','Close', {duration: 3000});
          this.router.navigate(['/dashboard']);
        }
        else{
          this.snackBar.open('Invalid Userid or Password','Close', {duration: 3000});
        }
      },
      error: (err: string) =>{
        this.snackBar.open('An error occured. Please try again,','Close', {duration: 3000});
      }
    });
  }

  signup()
  {
    this.router.navigate(['/signup']);
  }
}
