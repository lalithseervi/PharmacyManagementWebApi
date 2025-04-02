import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() isLoggedIn: boolean = false; // Input from parent component

  constructor(private router: Router) {}

  ngOnInit(): void {}

  logout() {
    console.log('Logging out...');
    this.router.navigate(['/login']);
    (window as any).appComponentRef.component.setLoginState(false); // Update AppComponent state
  }

  disableLogin()
  {
    (window as any).appComponentRef.component.setLoginState(false);
  }
}
