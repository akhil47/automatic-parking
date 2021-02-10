import { Component, OnInit } from '@angular/core';
import { ParkingService } from '../parking.service';

@Component({
  selector: 'app-parking-history',
  templateUrl: './parking-history.component.html',
  styleUrls: ['./parking-history.component.css']
})
export class ParkingHistoryComponent implements OnInit {

  parkingHistory = []
  totalFeeCollected = 0
  constructor(private parkingService: ParkingService) { }

  ngOnInit(): void {
    this.parkingHistory = this.parkingService.getParkingHistory()
    for(let log of this.parkingHistory){
      this.totalFeeCollected += log.fee
    }
  }

}
