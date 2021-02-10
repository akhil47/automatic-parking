import { Component, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ParkingService } from '../parking.service';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css']
})
export class AddCarComponent implements OnInit {

  selectedSlot = 'default'
  selectedColor = 'default'
  availableColors = ['Black', 'White', 'Grey', 'Green', 'Blue', 'Red', 'Yellow', 'Orange', 'Pink']
  availableSlots = []

  @Output() newCarAdded = new EventEmitter<any>();

  constructor(private parkingService: ParkingService) { }

  ngOnInit(): void {
    this.availableSlots = this.parkingService.getListOfFreeSlots()
  }

  parkCar(form: NgForm){
    console.log(form)
    let vehicleNo = form.value.vehicleNo
    let color = form.value.color
    let slotNo = form.value.slotNo

    this.parkingService.addCar(vehicleNo, color, slotNo)
    this.newCarAdded.emit(true)
  }
  

}
