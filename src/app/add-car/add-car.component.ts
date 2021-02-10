import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ParkingService } from '../parking.service';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css']
})
export class AddCarComponent implements OnInit {

  selectedSlot = 'default'
  availableSlots = []

  showErrorMsg = true
  errorMsg = 'Error: Please select a slot'
  @Output() newCarAdded = new EventEmitter<any>();

  constructor(private parkingService: ParkingService) { }

  ngOnInit(): void {
    this.showErrorMsg = false
    this.errorMsg = ''
    this.availableSlots = this.parkingService.getListOfFreeSlots()
  }

  parkCar(form: NgForm){
    console.log(form.value)
    let vehicleNo = form.value.vehicleNo
    let color = form.value.color
    let slotNo = form.value.slotNo
    if(slotNo == 'default'){
      this.showErrorMsg = true
      this.errorMsg = 'Error: Please select a slot'
    }
    else{
      this.showErrorMsg = false
      this.errorMsg = ''
      this.parkingService.addCar(vehicleNo, color, slotNo)
      this.newCarAdded.emit(true)
    }
  } 

}
