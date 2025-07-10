import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ThemaService {
  private themeSubject = new BehaviorSubject<boolean>(false);
  theme$ = this.themeSubject.asObservable();

  toggle(): void {
    this.themeSubject.next(!this.themeSubject.value);
  }

  get state(): boolean {
    return this.themeSubject.value;
  }
}
