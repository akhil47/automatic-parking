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

  constructor(private router: Router, private parkingService: ParkingService) { }

  ngOnInit(): void {
  }

  createNewParkingLot(form: NgForm){
    let totalSlots = form.value.noOfSlots
    let occupiedSlots = form.value.noOfCars

    this.parkingService.createParkingLot(totalSlots, occupiedSlots)

    this.router.navigate(['/parking-lot'])
  }
}
