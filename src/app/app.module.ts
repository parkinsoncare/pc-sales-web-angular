import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
// import { JwtModule } from '@auth0/angular-jwt';
import { FlexLayoutModule } from '@angular/flex-layout';
import { GtagModule } from 'angular-gtag';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialIoModule } from './material-io.module';
import { HomeComponent } from './public/home/home.component';
import { PublicRootComponent } from './public/public-root/public-root.component';
import { ContactUsComponent } from './public/contact-us/contact-us.component';
import { PrivateRootComponent } from './private/private-root/private-root.component';
import { DashboardComponent } from './private/dashboard/dashboard.component';
import { LoginRequiredDialogComponent } from './guards/login-required-dialog/login-required-dialog.component';
import { environment } from '../environments/environment';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CallbackComponent } from './public/callback/callback.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProfileComponent } from './private/profile/profile.component';
import { SidebarMenuComponent } from './components/sidebar-menu/sidebar-menu.component';
import { RemoveMeComponent } from './private/remove-me/remove-me.component';
import { Auth0UsersComponent } from './admin/auth0-users/auth0-users.component';
import { AdminRootComponent } from './admin/admin-root/admin-root.component';

// https://www.npmjs.com/package/@auth0/angular-jwt
// Replaced with @auth0/auth0-spa-js code, remove if still working
/*
export function newGetToken () {
  return localStorage.getItem('access_token');
}
*/

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PublicRootComponent,
    ContactUsComponent,
    PrivateRootComponent,
    DashboardComponent,
    LoginRequiredDialogComponent,
    HeaderComponent,
    FooterComponent,
    CallbackComponent,
    NavBarComponent,
    ProfileComponent,
    SidebarMenuComponent,
    RemoveMeComponent,
    Auth0UsersComponent,
    AdminRootComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialIoModule,
    FlexLayoutModule,
    HttpClientModule,
    NgbModule,
    /*
    JwtModule.forRoot({
      config: {
        tokenGetter: newGetToken,
        // https://www.npmjs.com/package/@auth0/angular-jwt
        // jwt are only sent to these domains.
        whitelistedDomains: [ environment.restServiceWhitelistDomain ],
        blacklistedRoutes: ['localhost:4200/engine-rest/', 'localhost:8080/engine-rest/']
      }
    }),
    */
    GtagModule.forRoot({ trackingId: environment.gAnalyticsCode, trackPageviews: true }),
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    LoginRequiredDialogComponent
  ]
})
export class AppModule { }
