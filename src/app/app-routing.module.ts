import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './public/home/home.component';
import { PublicRootComponent } from './public/public-root/public-root.component';
import { ContactUsComponent } from './public/contact-us/contact-us.component';
import { PrivateRootComponent } from './private/private-root/private-root.component';
import { DashboardComponent } from './private/dashboard/dashboard.component';
import { AuthenticatedGuard } from './guards/authenticated/authenticated.guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterceptorService } from './services/http-interceptor/http-interceptor.service';
import { CallbackComponent } from './public/callback/callback.component';
import { ProfileComponent } from './private/profile/profile.component';
import { RemoveMeComponent } from './private/remove-me/remove-me.component';
import { AdminRootComponent } from './admin/admin-root/admin-root.component';
import { Auth0UsersComponent } from './admin/auth0-users/auth0-users.component';
import { LoginErrorComponent } from './public/login-error/login-error.component';

const routes: Routes = [
  { path: '', redirectTo: '/public/home', pathMatch: 'full' },
  { path: 'public', component: PublicRootComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'contactus', component: ContactUsComponent },
      { path: 'callback', component: CallbackComponent },
      { path: 'loginerror/:errorType', component: LoginErrorComponent }
    ]
  },
  {
    path: 'private', component: PrivateRootComponent, canActivateChild: [AuthenticatedGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      { path: 'dashboard', component: DashboardComponent},
      { path: 'profile', component: ProfileComponent},
      { path: 'removeme', component: RemoveMeComponent }
    ]
  },
  {
    path: 'admin', component: AdminRootComponent, canActivateChild: [AuthenticatedGuard],
    children: [
      { path: '', redirectTo: 'users', pathMatch: 'full'},
      { path: 'users', component: Auth0UsersComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [

    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    }

  ]
})
export class AppRoutingModule { }
