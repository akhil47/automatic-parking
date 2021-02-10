import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ParkingDetailsComponent } from './parking-details/parking-details.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AddCarComponent } from './add-car/add-car.component';
import { ParkingHistoryComponent } from './parking-history/parking-history.component';
import { GuardService } from './guard.service';
import { VehicleNoValidatorDirective } from './vehicle-no-validator.directive';

const appRoutes = [
  {path: '', redirectTo: 'create-parking-lot', pathMatch: 'full'},
  {path: 'create-parking-lot', component: LandingPageComponent},
  {path: 'parking-lot', canActivate: [GuardService], component: ParkingDetailsComponent},
  {path: '**', component: PageNotFoundComponent}
]
@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    ParkingDetailsComponent,
    HeaderComponent,
    AddCarComponent,
    ParkingHistoryComponent,
    VehicleNoValidatorDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
