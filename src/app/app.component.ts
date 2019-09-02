import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
import { AuthService } from './services/auth/auth.service';
import { MenuToggleBroadcastService } from './services/menu-toggle-broadcast/menu-toggle-broadcast.service';
import { Gtag } from 'angular-gtag';
import { environment } from './../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public title = environment.companyName;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  url: string;

  constructor(private breakpointObserver: BreakpointObserver,
              public auth: AuthService,
              private route: ActivatedRoute,
              public router: Router,
              private menuBroadcast: MenuToggleBroadcastService,
              gtag: Gtag) {
    // moved to OnInit this.auth.handleAuthentication();
  }

  ngOnInit() {
    //this.auth.handleAuthentication();
    //this.auth.handleAuthCallback();
    this.auth.localAuthSetup();
    this.route.url.subscribe(url => { this.url = url.join(); }, e => { this.url = ''; } );
  }

  toggleMenus() {
    this.menuBroadcast.toggleMenu();
  }
}
