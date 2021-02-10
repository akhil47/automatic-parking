import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { defaultParkedCars, ParkingLot } from './default-parked-cars'

@Injectable({
  providedIn: 'root'
})
export class ParkingService {

  private totalSlots = 0
  private occupiedSlots = 0

  private parkedCarsList = []
  private freeSlots = []

  private parkingHistory = []

  public currentParkingLotStatus = new Subject<ParkingLot>()
  
  constructor() {}

  createParkingLot(totalSlots: number, occupiedSlots: number){
    this.parkedCarsList = []
    this.freeSlots = []

    this.totalSlots = totalSlots
    this.occupiedSlots = occupiedSlots

    for(let i = 0; i < this.totalSlots; i++){
      this.freeSlots.push(i + 1)
    }

    for(let i = 0; i < this.occupiedSlots; i++){
      let slot = {slotNo: this.freeSlots.shift()}
      this.parkedCarsList.push({...defaultParkedCars[i % 5], ...slot})
    }

    console.log(this.totalSlots, this.occupiedSlots, this.parkedCarsList, this.freeSlots)
  }
  getTotalSlots(){
    return this.totalSlots
  }
  getAvailableSlots(){
    return this.freeSlots.length
  }
  getListOfFreeSlots(){
    return [...this.freeSlots].sort((a, b) => a - b)
  }
  getParkedCars(){
    return [...this.parkedCarsList]
  }
  addCar(vehicleNo: string, color: string, slotNo){
    let car = {
      vehicleNo: vehicleNo,
      color: color,
      inTime: new Date(),
      slotNo: slotNo
    }
    let i = this.freeSlots.indexOf(slotNo)
    this.freeSlots.splice(i, 1)
    this.parkedCarsList.push(car)
    this.occupiedSlots = this.parkedCarsList.length
    
    this.currentParkingLotStatus.next({
      availableSlots: this.freeSlots.length,
      parkedCarsList: [...this.parkedCarsList]
    })
  }
  removeCar(index: number){
    let car = {
      ...this.parkedCarsList.splice(index, 1)[0],
      outTime: new Date(),
      fee: 20
    }
    this.freeSlots.push(car['slotNo'])
    this.occupiedSlots = this.parkedCarsList.length

    this.parkingHistory.push(car)
    this.currentParkingLotStatus.next({
      availableSlots: this.freeSlots.length,
      parkedCarsList: [...this.parkedCarsList]
    })
    console.log(this.freeSlots, this.parkingHistory)
  }
}