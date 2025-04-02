import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { admin } from 'src/app/models/admin';
import { CommonservicesService } from 'src/app/services/commonservices.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  record = new admin();

  constructor(
    private router: Router,
    private _service: CommonservicesService,
    private snackBar: MatSnackBar,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.loadingService.showLoading();

    // Simulate a task (like data fetch or component logic)
    setTimeout(() => {
      console.log('Task completed');
      this.loadingService.hideLoading();
    }, 1000);
  }

  login() {
    this._service.validateLogin(this.record.username, this.record.password).subscribe({
      next: (data: any) => {
        if (data.ok === 200) {
          this.snackBar.open('Login Successful!!', 'Close', { duration: 3000 });
          (window as any).appComponentRef.component.setLoginState(true); // Update AppComponent state
          this.router.navigate(['/dashboard']);
        } else {
          this.snackBar.open('Invalid Userid or Password', 'Close', { duration: 3000 });
        }
      },
      error: () => {
        this.snackBar.open('An error occurred. Please try again.', 'Close', { duration: 3000 });
      },
    });
  }

  signup() {
    this.router.navigate(['/signup']);
  }
}
