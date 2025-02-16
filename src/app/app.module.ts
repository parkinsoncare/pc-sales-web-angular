import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialIoModule } from './material-io.module';
import { HomeComponent } from './public/home/home.component';
import { SidebarMenuComponent } from './components/sidebar-menu/sidebar-menu.component';
import { PublicRootComponent } from './public/public-root/public-root.component';
import { ContactUsComponent } from './public/contact-us/contact-us.component';
import { environment } from '../environments/environment';
import { FooterComponent } from './components/footer/footer.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { PcareHeaderComponent } from './components/pcare-header/pcare-header.component';
import { CosaFaComponent } from './components/home-components/cosa-fa/cosa-fa.component';
import { ComEComponent } from './components/home-components/com-e/com-e.component';
import { PcareIntroComponent } from './components/home-components/pcare-intro/pcare-intro.component';
import { CallMeComponent } from './components/home-components/call-me/call-me.component';
import { ChiSiamoComponent } from './components/home-components/chi-siamo/chi-siamo.component';
import { QuestionsComponent } from './components/home-components/questions/questions.component';
import { DiscountCodeComponent } from './components/home-components/discount-code/discount-code.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PublicRootComponent,
    ContactUsComponent,
    FooterComponent,
    SidebarMenuComponent,
    PcareHeaderComponent,
    CosaFaComponent,
    ComEComponent,
    PcareIntroComponent,
    CallMeComponent,
    ChiSiamoComponent,
    QuestionsComponent,
    DiscountCodeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialIoModule,
    FlexLayoutModule,
    HttpClientModule,
    NgbModule,
    FontAwesomeModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [

  ]
})
export class AppModule { }
