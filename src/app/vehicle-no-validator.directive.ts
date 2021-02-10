import { Directive, forwardRef } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { ParkingService } from './parking.service';

@Directive({
  selector: '[appVehicleNoValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: forwardRef(() => VehicleNoValidatorDirective), multi: true }]
})
export class VehicleNoValidatorDirective implements Validator{

  constructor(private parkingService: ParkingService) { }

  validate(control: AbstractControl): ValidationErrors | null {
    let vehicleNo = control.value
    let errors = null
    if(vehicleNo != null){
      if(vehicleNo.match(new RegExp(/^[A-Z]{2}[0-9]{2}[A-Z]{2}[0-9]{4}$/)) == null){
        if(errors == null) errors = {}
        errors['invalidVehicleNo'] = 'Please provide valid Reg No. eg: KA12EK1234'
      }
      if(vehicleNo.length == 0){
        if(errors == null) errors = {}
        errors['invalidVehicleNo'] = 'Please provide valid Reg No. eg: KA12EK1234'
      }
      if(this.checkIfVehicleNoAlreadyExistsInParking(vehicleNo)){
        if(errors == null) errors = {}
        errors['carParked'] = vehicleNo + ' vehicle is already parked, please try '
      }
    }
    return errors
  }
  checkIfVehicleNoAlreadyExistsInParking(vehicleNo){
    let carsInParking = this.parkingService.getParkedCars()
    let isVehicleInParking = false
    for(let car of carsInParking){
      if(car.vehicleNo === vehicleNo){
        isVehicleInParking = true;
        break;
      }
    }
    return isVehicleInParking
  }

}
