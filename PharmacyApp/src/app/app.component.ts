import { ChangeDetectorRef, Component } from '@angular/core';
import { NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'PharmacyApp';
  
  constructor(private router: Router, private cdRef: ChangeDetectorRef) {
    
  }

  
}
