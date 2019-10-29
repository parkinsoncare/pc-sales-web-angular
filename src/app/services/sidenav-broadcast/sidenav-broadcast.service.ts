import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidenavBroadcastService {
  private menuToggledSource = new Subject<boolean>();
  private textToggledSource = new Subject<boolean>();
  menuToggled$ = this.menuToggledSource.asObservable();
  textToggled$ = this.textToggledSource.asObservable();
  public showTextDescriptions = true;

  constructor() { }

  toggleMenu() {
    this.menuToggledSource.next(true);
  }

  toggleTextDescriptions() {
    this.showTextDescriptions = !this.showTextDescriptions;
    this.textToggledSource.next(true);
  }
}
