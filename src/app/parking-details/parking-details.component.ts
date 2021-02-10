import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ParkingService } from '../parking.service';

@Component({
  selector: 'app-parking-details',
  templateUrl: './parking-details.component.html',
  styleUrls: ['./parking-details.component.css']
})
export class ParkingDetailsComponent implements OnInit {

  carsParked = []
  selectedColor = 'default'

  constructor(private parkingService: ParkingService) { }

  ngOnInit(): void {
    this.carsParked = this.parkingService.getParkedCars()
  }
  searchCars(f: NgForm){
    console.log(f.value)
  }
  resetFilters(f: NgForm){
    f.resetForm({
      regNo: '',
      color: 'default'
    })
  }

}
