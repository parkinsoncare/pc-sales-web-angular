import { Injectable } from '@angular/core';
import {NavigationEnd} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GTagManagerService {

  constructor() { }

  gTMPageView(event: NavigationEnd) {

    console.log('GTagManagerService gTMPageView:', JSON.stringify(event.urlAfterRedirects));
    const gtmTag = {
      event:'VirtualPageview',
      virtualPageURL: event.urlAfterRedirects
    };

    ( window as any).dataLayer.push(gtmTag);
  }

  gTMEvent(eventName) {
    console.log('GTagManagerService gTMEvent:', JSON.stringify(eventName));

    const gtmTag = {
      event: 'VirtualEvent',
      virtualEvent: eventName
    };
    ( window as any).dataLayer.push(gtmTag);
  }
}
