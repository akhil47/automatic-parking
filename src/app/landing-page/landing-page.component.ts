import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ParkingService } from '../parking.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  showErrorMsg = false
  errorMsg = ''
  constructor(private router: Router, private parkingService: ParkingService) { }

  ngOnInit(): void {
    this.parkingService.removeParkingLot()
  }

  createNewParkingLot(form: NgForm){
    let totalSlots = form.value.noOfSlots
    let occupiedSlots = form.value.noOfCars

    if(totalSlots == 0){
      this.showErrorMsg = true
      this.errorMsg = 'Error: Please provide atleast 1 slot'
    }
    else if(totalSlots < 0 || occupiedSlots < 0){
      this.showErrorMsg = true
      this.errorMsg = 'Error: Invalid input, please try again'
    }
    else if(totalSlots < occupiedSlots){
      this.showErrorMsg = true
      this.errorMsg = 'Error: Available slots are less than parked cars'
    }
    else{
      this.parkingService.createParkingLot(totalSlots, occupiedSlots)
      this.router.navigate(['/parking-lot'])
    }
  }
}
