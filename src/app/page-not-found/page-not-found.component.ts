import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ParkingService } from '../parking.service';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {

  constructor(private router: Router, private parkingService: ParkingService) { }

  ngOnInit(): void {
    this.parkingService.removeParkingLot()
  }
  navigateHome(){
    this.router.navigate(['/'])
  }

}
