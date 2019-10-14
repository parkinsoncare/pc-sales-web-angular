import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuToggleBroadcastService {
  private menuToggledSource = new Subject<boolean>();
  menuToggled$ = this.menuToggledSource.asObservable();
  public showTextDescriptions = true;

  constructor() { }

  toggleMenu() {
    this.menuToggledSource.next(true);
  }

  toggleTextDescriptions() {
    this.showTextDescriptions = !this.showTextDescriptions;
    this.menuToggledSource.next(true);
  }
}
