import { FormsModule } from '@angular/forms';

import { AdminComponent } from './components/admin/admin.component';
import { BandRegistrationComponent } from './components/band-registration/band-registration.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BandBuilderComponent } from './components/band-builder/band-builder.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './components/home/home.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { HttpClientModule } from '@angular/common/http';
import { JesseTestPageComponent } from './components/jesse-test-page/jesse-test-page.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProfileComponent } from './components/profile/profile.component';
import { GregsTestPageComponent } from './components/gregs-test-page/gregs-test-page.component';
import { BandComponent } from './components/band/band.component';
import { SearchByKeywordPipe } from './pipes/search-by-keyword.pipe';
import { InstrumentPipe } from './pipes/instrument.pipe';
import { UserInstrumentComponent } from './components/user-instrument/user-instrument.component';
import { SearchBandPipe } from './pipes/search-band.pipe';


// search module

@NgModule({
  declarations: [
    AppComponent,
    BandBuilderComponent,
    HomeComponent,
    NavBarComponent,
    JesseTestPageComponent,
    RegistrationComponent,
    BandRegistrationComponent,
    FooterComponent,
    ProfileComponent,
    GregsTestPageComponent,
    BandComponent,
    AdminComponent,
    SearchByKeywordPipe,
    InstrumentPipe,
    UserInstrumentComponent,
    SearchBandPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [ SearchByKeywordPipe, InstrumentPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
