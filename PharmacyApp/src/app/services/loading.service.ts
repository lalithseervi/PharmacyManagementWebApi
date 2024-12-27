// loading.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();

  private timeoutId: any; // Keep track of the timeout ID

  showLoading() {
    this.loadingSubject.next(true);

    // Clear any existing timeout
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }

    // Set timeout for 2 minutes
    this.timeoutId = setTimeout(() => {
      this.hideLoading();
    }, 2 * 60 * 1000); // 2 minutes
  }

  hideLoading() {
    this.loadingSubject.next(false);

    // Clear timeout to prevent unexpected behavior
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }
}
