import { Component, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ParkingService } from '../parking.service';

@Component({
  selector: 'app-parking-details',
  templateUrl: './parking-details.component.html',
  styleUrls: ['./parking-details.component.css']
})
export class ParkingDetailsComponent implements OnInit, OnDestroy {

  @HostListener('document:keydown.escape', ['$event']) onEscape(event: KeyboardEvent) {
    this.closePopup()
  }
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

  sortState = null

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
        this.sortState = null
        this.extractCarColors()
      }
    )
  }
  ngOnDestroy(){
    if(this.parkingLotSubscription) this.parkingLotSubscription.unsubscribe()
    if(this.vehicleNoSubscription) this.vehicleNoSubscription.unsubscribe()
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
  sortCars(type: string){
    if(type === 'vehicleNo'){
      if(this.sortState == null){
        this.sortState = {
          header: 'vehicleNo',
          type: 1,
          originalState: [...this.filteredCarsParked]
        }
        this.filteredCarsParked.sort((a, b) => {
          if(a.vehicleNo < b.vehicleNo) return -1;
          else if(a.vehicleNo > b.vehicleNo) return 1;
          return 0;
        })
      }
      else if(this.sortState.header !== 'vehicleNo'){
        this.sortState.header = 'vehicleNo'
        this.sortState.type = 1
        this.filteredCarsParked.sort((a, b) => {
          if(a.vehicleNo < b.vehicleNo) return -1;
          else if(a.vehicleNo > b.vehicleNo) return 1;
          return 0;
        })
      }
      else if(this.sortState.header === 'vehicleNo' && this.sortState.type == 1){
        this.filteredCarsParked.sort((a, b) => {
          if(a.vehicleNo < b.vehicleNo) return 1;
          else if(a.vehicleNo > b.vehicleNo) return -1;
          return 0;
        })
        this.sortState['header'] = 'vehicleNo'
        this.sortState['type'] = -1
      }
      else if(this.sortState.header === 'vehicleNo' && this.sortState.type == -1){
        this.filteredCarsParked = [...this.sortState.originalState]
        this.sortState = null
      }
    }
    else if(type === 'color'){
      if(this.sortState == null){
        this.sortState = {
          header: 'color',
          type: 1,
          originalState: [...this.filteredCarsParked]
        }
        this.filteredCarsParked.sort((a, b) => {
          if(a.color < b.color) return -1;
          else if(a.color > b.color) return 1;
          return 0;
        })
      }
      else if(this.sortState.header !== 'color'){
        this.sortState.header = 'color'
        this.sortState.type = 1
        this.filteredCarsParked.sort((a, b) => {
          if(a.color < b.color) return -1;
          else if(a.color > b.color) return 1;
          return 0;
        })
      }
      else if(this.sortState.header === 'color' && this.sortState.type == 1){
        this.filteredCarsParked.sort((a, b) => {
          if(a.color < b.color) return 1;
          else if(a.color > b.color) return -1;
          return 0;
        })
        this.sortState['header'] = 'color'
        this.sortState['type'] = -1
      }
      else if(this.sortState.header === 'color' && this.sortState.type == -1){
        this.filteredCarsParked = [...this.sortState.originalState]
        this.sortState = null
      }
    }
    else if(type === 'slotNo'){
      if(this.sortState == null){
        this.sortState = {
          header: 'slotNo',
          type: 1,
          originalState: [...this.filteredCarsParked]
        }
        this.filteredCarsParked.sort((a, b) => {
          if(a.slotNo < b.slotNo) return -1;
          else if(a.slotNo > b.slotNo) return 1;
          return 0;
        })
      }
      else if(this.sortState.header !== 'slotNo'){
        this.sortState.header = 'slotNo'
        this.sortState.type = 1
        this.filteredCarsParked.sort((a, b) => {
          if(a.slotNo < b.slotNo) return -1;
          else if(a.slotNo > b.slotNo) return 1;
          return 0;
        })
      }
      else if(this.sortState.header === 'slotNo' && this.sortState.type == 1){
        this.filteredCarsParked.sort((a, b) => {
          if(a.slotNo < b.slotNo) return 1;
          else if(a.slotNo > b.slotNo) return -1;
          return 0;
        })
        this.sortState['header'] = 'slotNo'
        this.sortState['type'] = -1
      }
      else if(this.sortState.header === 'slotNo' && this.sortState.type == -1){
        this.filteredCarsParked = [...this.sortState.originalState]
        this.sortState = null
      }
    }
    else if(type === 'date'){
      if(this.sortState == null){
        this.sortState = {
          header: 'date',
          type: 1,
          originalState: [...this.filteredCarsParked]
        }
        this.filteredCarsParked.sort((a, b) => {
          return a.inTime - b.inTime;
        })
      }
      else if(this.sortState.header !== 'date'){
        this.sortState.header = 'date'
        this.sortState.type = 1
        this.filteredCarsParked.sort((a, b) => {
          return a.inTime - b.inTime;
        })
      }
      else if(this.sortState.header === 'date' && this.sortState.type == 1){
        this.filteredCarsParked.sort((a, b) => {
          return b.inTime - a.inTime;
        })
        this.sortState['header'] = 'date'
        this.sortState['type'] = -1
      }
      else if(this.sortState.header === 'date' && this.sortState.type == -1){
        this.filteredCarsParked = [...this.sortState.originalState]
        this.sortState = null
      }
    }
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