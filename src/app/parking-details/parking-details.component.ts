import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ParkingService } from '../parking.service';

@Component({
  selector: 'app-parking-details',
  templateUrl: './parking-details.component.html',
  styleUrls: ['./parking-details.component.css']
})
export class ParkingDetailsComponent implements OnInit {

  @ViewChild('f') filtersForm: NgForm

  totalSlots = 0
  availableSlots = 0
  carsParked = []
  filteredCarsParked = []
  selectedColor = 'default'
  listCarColorsInParking = []

  parkingLotSubscription: Subscription

  showParkCarPopup = false
  showParkingHistory = false

  constructor(private parkingService: ParkingService) { }

  ngOnInit(): void {
    this.carsParked = this.parkingService.getParkedCars()
    this.filteredCarsParked = [...this.carsParked]
    this.totalSlots = this.parkingService.getTotalSlots()
    this.availableSlots = this.parkingService.getAvailableSlots()
    this.extractCarColors()

    this.parkingLotSubscription = this.parkingService.currentParkingLotStatus.subscribe(
      status => {
        this.availableSlots = status.availableSlots,
        this.carsParked = status.parkedCarsList
        this.filteredCarsParked = [...this.carsParked]
        this.extractCarColors()
      }
    )
  }
  extractCarColors(){
    this.listCarColorsInParking = []
    let colors = {}
    for(let car of this.carsParked){
      colors[car.color] = 1
    }
    this.listCarColorsInParking = Object.keys(colors)
  }
  searchCars(f: NgForm){
    let vehicleNo = f.value.regNo
    let color = f.value.color
    this.filteredCarsParked = this.carsParked.filter(
      (car, index) => {
        if(color != 'default'){
          return (car.color == color && car.vehicleNo.match(vehicleNo))
        }
        else{
          return car.vehicleNo.match(vehicleNo)
        }
      }
    )
  }
  resetFilters(f: NgForm){
    f.resetForm({
      regNo: '',
      color: 'default'
    })
    this.filteredCarsParked = [...this.carsParked]
  }
  showParkCar(){
    this.showParkCarPopup = true
  }
  showParkingLogs(){
    this.showParkingHistory = true
  }
  removeCar(index){
    this.parkingService.removeCar(index)
    this.resetFilters(this.filtersForm)
  }
  closePopup(){
    this.showParkCarPopup = false
    this.showParkingHistory = false
  }
}