import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ActivatedRoute, Router, UrlSegment, NavigationEnd } from '@angular/router';
import { AuthService } from './services/auth/auth.service';
import { environment } from './../environments/environment';
import { GTagManagerService } from './services/g-tag-manager/g-tag-manager.service';
import { SidenavBroadcastService } from './services/sidenav-broadcast/sidenav-broadcast.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public title = environment.companyName;

  url: string;

  constructor(public auth: AuthService,
              private route: ActivatedRoute,
              public router: Router,
              private menuBroadcast: SidenavBroadcastService,
              //gtag: Gtag,
              private gTagManager: GTagManagerService) {
    // moved to OnInit this.auth.handleAuthentication();


    // reference for this code:
    // https://medium.com/quick-code/set-up-analytics-on-an-angular-app-via-google-tag-manager-5c5b31e6f41
    // https://www.npmjs.com/package/angular-google-tag-manager
    // gTagManager config: https://www.bounteous.com/insights/2014/09/10/how-fire-virtual-pageview-google-tag-manager/
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.gTagManager.gTMPageView(event);
      }
    });
  }

  ngOnInit() {
    this.auth.localAuthSetup();
    this.route.url.subscribe(url => { this.url = url.join(); }, e => { this.url = ''; } );
  }

  toggleMenus() {
    this.menuBroadcast.toggleMenu();
  }
}
