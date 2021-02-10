import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ParkingService } from '../parking.service';

@Component({
  selector: 'app-parking-details',
  templateUrl: './parking-details.component.html',
  styleUrls: ['./parking-details.component.css']
})
export class ParkingDetailsComponent implements OnInit {

  totalSlots = 0
  availableSlots = 0
  carsParked = []
  selectedColor = 'default'

  parkingLotSubscription: Subscription

  showParkCarPopup = false

  constructor(private parkingService: ParkingService) { }

  ngOnInit(): void {
    this.carsParked = this.parkingService.getParkedCars()
    this.totalSlots = this.parkingService.getTotalSlots()
    this.availableSlots = this.parkingService.getAvailableSlots()

    this.parkingLotSubscription = this.parkingService.currentParkingLotStatus.subscribe(
      status => {
        this.availableSlots = status.availableSlots,
        this.carsParked = status.parkedCarsList
      }
    )
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
  showParkCar(){
    this.showParkCarPopup = true
  }
  removeCar(index){
    this.parkingService.removeCar(index)
  }
  closePopup(){
    this.showParkCarPopup = false
    console.log('close')
  }
}
