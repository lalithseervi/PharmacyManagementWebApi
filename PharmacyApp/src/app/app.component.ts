import { ChangeDetectorRef, Component } from '@angular/core';
import { NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLoading = false;
  title = 'PharmacyApp';
  
  constructor(private router: Router, private cdRef: ChangeDetectorRef) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.isLoading = true;
        console.log('Navigation started');
        setTimeout(() => {
          this.isLoading = false;
          console.log('Spinner hidden');
          this.cdRef.detectChanges();  // Trigger change detection
        }, 2000);
      }

      if (event instanceof NavigationEnd || event instanceof NavigationError) {
        this.isLoading = false;
        console.log('Navigation ended or error');
        this.cdRef.detectChanges();  // Trigger change detection
      }
    });
  }

  isLandingPage(router: any): boolean {
    return router.isActive('/', { exact: true });
  }
}
