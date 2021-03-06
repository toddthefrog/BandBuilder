import { InstrumentPipe } from './../../pipes/instrument.pipe';
import { SearchByKeywordPipe } from 'src/app/pipes/search-by-keyword.pipe';
import { ProfileService } from './../../services/profile.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Profile } from 'src/app/models/profile';
import { Instrument } from 'src/app/models/instrument';
import { instantiateRootComponent } from '@angular/core/src/render3/instructions';
import { Image } from 'src/app/models/image';
import { InstrumentService } from 'src/app/services/instrument.service';
import { InstrumentForm } from 'src/app/models/instrument-form';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  // Constructor
  constructor(private auth: AuthService,
              private router: Router,
              private profileSrv: ProfileService,
              private instrumentSrv: InstrumentService,
              private searchByKeywordPipe: SearchByKeywordPipe,
              private instrumentPipe: InstrumentPipe
  ) { }
  // Fields
  adminProfile: Profile = null;
  isLoggedIn = false;
  myflag = false;
  profiles: Profile[] = [];
  instruments: Instrument[] = [];
  instrument: Instrument = null;
  selected: Profile = null;
  profile: Profile = null;
  searchText: '';
// tslint:disable-next-line: new-parens
  newInstrument: InstrumentForm = new InstrumentForm();

  // Methods
  ngOnInit() {
    this.loadProfile();
    this.isLoggedIn = this.auth.checkLogin();
    this.loadInstruments();
    this.loadUserProfiles();
  }

  reload() {
    this.profileSrv.index().subscribe(
      data => {
        this.profiles = data;
      },
      err => {
        console.error('AdminComponent.reload() ERROR');
        console.error(err);
      }
    );
  }
  loadInstruments() {
    this.instrumentSrv.index().subscribe(
      data => {
        this.instruments = data;
      },
      err => {
        console.error('AdminComponent.loadInstruments(): ERROR');
        console.error(err);
      }
    );

  }
  deleteInstrument(instrument: Instrument) {
    this.instrumentSrv.delete(instrument.id).subscribe(
      data => {
        this.instrument = data;
        this.loadInstruments();
      },
      err => {
        console.error('AdminComponent.delete(): Error');
        console.error(err);
      }
    );
  }
  acceptInstrument(id: number, instrument: Instrument) {
    this.instrumentSrv.update(id, instrument).subscribe(
      data => {
        this.instrument = data;
      },
      err => {
        console.error('AdminComponent.delete(): Error');
        console.error(err);
      }
    );
  }
  deactivateProfile(id: number, profile: Profile) {
    profile.active = false;
    this.profileSrv.update(id, profile).subscribe(
      data => {
        this.loadUserProfiles();
      },
      err => {
        console.error('AdminComponent.delete(): Error');
        console.error(err);
      }
    );
  }
  reactivateProfile(id: number, profile: Profile) {
    profile.active = true;
    this.profileSrv.update(id, profile).subscribe(
      data => {
        this.loadUserProfiles();
      },
      err => {
        console.error('AdminComponent.delete(): Error');
        console.error(err);
      }
    );

  }
  setInstrumentSelected(instrument) {
    this.selected = instrument;

  }
  setProfileSelected(profile) {
    this.selected = profile;
  }
  formatCompletedProfile(profile) {
    if (profile.completed) {
      return 'completed';
    }
    return '';
  }
  formatCompletedInstrument(instrument) {
    if (instrument.completed) {
      return 'completed';
    }
    return '';
  }

  loadProfile() {
    const username = this.auth.getUsername();
    // console.log(username);
    this.profileSrv.showProfileByUsername(username).subscribe(
      data => {
        this.adminProfile = data;
      },
      err => {
        console.error('AdminComponent.loadProfile(): Error');
        console.error(err);
      }
    );
  }
  loadUserProfiles() {
    this.profileSrv.index().subscribe(
      data => {
        this.profiles = data;
      },
      err => {
        console.error('AdminComponent.loadProfile(): Error');
        console.error(err);
      }
    );
  }
  addInstrument(newInstrument: InstrumentForm) {
    this.instrumentSrv.create(newInstrument).subscribe(
      data => {
        this.loadInstruments();
        this.newInstrument = new InstrumentForm();
      },
      err => {
        console.error('AdminComponent.addInstrument(): Error');
        console.error(err);
      }
    );
  }
}
