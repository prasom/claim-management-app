import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ClaimService } from '../../claim/claim.service';
import { ClaimViewObject } from '../../claim/claim.interface';

const { remote, webContents } = (<any>window).require('electron');
const mainProcess = remote.require('./main.js');

@Component({
  selector: 'app-print-appointment-card',
  templateUrl: './print-appointment-card.component.html',
  styleUrls: ['./print-appointment-card.component.css']
})
export class PrintAppointmentCardComponent implements OnInit {
  id: any;
  claimInfo: ClaimViewObject;
  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private claimService: ClaimService,
  ) { }

  ngOnInit() {
    this.id = this.activeRoute.snapshot.paramMap.get('id');
    if (this.id) {
      this.claimService.getClaimById(this.id).subscribe(data => {
        this.claimInfo = data;
      });
    }
  }

  print() {
    let print = webContents.fromId('print');
    console.log(print);

    // mainProcess.printDefault();
  }

  printToPdf() {
    mainProcess.printPdf();
  }

  discard() {
    this.router.navigate(['claim-list-page']);
  }

}
