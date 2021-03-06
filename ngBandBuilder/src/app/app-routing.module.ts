import { UserInstrument } from './models/user-instrument';
import { GregsTestPageComponent } from './components/gregs-test-page/gregs-test-page.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { JesseTestPageComponent } from './components/jesse-test-page/jesse-test-page.component';
import { BandRegistrationComponent } from './components/band-registration/band-registration.component';
import { ProfileComponent } from './components/profile/profile.component';
import { BandComponent } from './components/band/band.component';
import { AdminComponent } from './components/admin/admin.component';
import { UserInstrumentComponent } from './components/user-instrument/user-instrument.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'jessetestpage', component: JesseTestPageComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'bandregistration', component: BandRegistrationComponent },
  { path: 'gtestpage', component: GregsTestPageComponent},
  { path: 'profiles', component: ProfileComponent },
  { path: 'profiles/:id', component: ProfileComponent},
  { path: 'bands', component: BandComponent },
  { path: 'bands/:id', component: BandComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'userinstruments/:id', component: UserInstrumentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
