import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ParkingService } from '../parking.service';

@Component({
  selector: 'app-parking-details',
  templateUrl: './parking-details.component.html',
  styleUrls: ['./parking-details.component.css']
})
export class ParkingDetailsComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('f') filtersForm: NgForm

  private vehicleNo;
  @ViewChild('regNo') set initVehicleNo(regNo){
    if(regNo){
      this.vehicleNo = regNo
      this.vehicleNoSubscription = this.vehicleNo.valueChanges.subscribe(
        searchValue => {
          this.filteredCarsParked = this.carsParked.filter(
            (car, index) => {
                return car.vehicleNo.match(new RegExp(searchValue, 'i'))
            }
          )
        }
      )
    }
  }

  totalSlots = 0
  availableSlots = 0
  carsParked = []
  filteredCarsParked = []
  selectedColor = 'default'
  listCarColorsInParking = []

  parkingLotSubscription: Subscription
  vehicleNoSubscription: Subscription

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
  ngOnDestroy(){
    if(this.parkingLotSubscription) this.parkingLotSubscription.unsubscribe()
    if(this.vehicleNoSubscription) this.vehicleNoSubscription.unsubscribe()
  }
  ngAfterViewInit(){
    
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
          return car.vehicleNo.match(new RegExp(vehicleNo, 'i'))
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