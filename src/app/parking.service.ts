import { Injectable } from '@angular/core';
import { defaultParkedCars } from './default-parked-cars'

@Injectable({
  providedIn: 'root'
})
export class ParkingService {

  private totalSlots = 0
  private occupiedSlots = 0

  private parkedCarsList = []
  private freeSlots = []
  
  constructor() {}

  createParkingLot(totalSlots, occupiedSlots){
    this.parkedCarsList = []

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
  getParkedCars(){
    return [...this.parkedCarsList]
  }
}
