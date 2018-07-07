import { Component, OnInit } from '@angular/core';
import { ParkingHistoryViewModel, ParkingHistoryRequestModel, ParkingHistoryFullViewModel } from '../parking.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { ParkingService } from '../parking.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';
import { ClaimService } from '../../claim/claim.service';

@Component({
  selector: 'app-parking-detail',
  templateUrl: './parking-detail.component.html',
  styleUrls: ['./parking-detail.component.css']
})
export class ParkingDetailComponent implements OnInit {

  parkingForms: FormGroup;
  parkingDetail: ParkingHistoryFullViewModel;
  parkingRequest: ParkingHistoryRequestModel;
  id: any;
  constructor(
    private fb: FormBuilder,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private parkingService: ParkingService,
    private claimService: ClaimService,
  ) { }

  ngOnInit() {
    this.parkingForms = this.fb.group({
      isParking: ['']
    });
    this.id = this.activeRoute.snapshot.paramMap.get('id');
    this.parkingService.getParkingDetail(this.id).subscribe(data => {
      this.parkingDetail = data;
      this.parkingForms.controls['isParking'].setValue(data.is_parking);
      console.log(this.parkingDetail);
    });
  }

  save() {
    if (this.parkingForms.valid) {
      this.parkingRequest = {
        claim_info_id: this.id,
        is_parking: this.parkingForms.get('isParking').value,
        create_date: moment().toDate()
      };
      this.parkingService.createParking(this.parkingRequest).then(res => {
        this.claimService.updateParkingStatus(1, this.id).then(res => {
          this.router.navigate(['parking-list']);
        });
      });
    }
  }

  discard() {
    this.router.navigate(['parking-list']);
  }

}
