import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'PharmacyApp';
  
  isLoggedIn = false;
  constructor() {
    (window as any).appComponentRef = { component: this };
  }

  // Method to update login state
  setLoginState(state: boolean) {
    this.isLoggedIn = state;
  }
}
