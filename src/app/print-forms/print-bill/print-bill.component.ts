import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ClaimService } from '../../claim/claim.service';
import { ClaimViewObject } from '../../claim/claim.interface';
import { BillService } from '../../bill/bill.service';
import { BillFullViewModel } from '../../bill/bill.interface';
import * as moment from 'moment';
const { remote, webContents } = (<any>window).require('electron');
const mainProcess = remote.require('./main.js');

@Component({
  selector: 'app-print-bill',
  templateUrl: './print-bill.component.html',
  styleUrls: ['./print-bill.component.css']
})
export class PrintBillComponent implements OnInit {
  id: any;
  billInfo: BillFullViewModel;
  checked: any = true;
  day: string;
  month: string;
  year: number;
  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private billService: BillService,
  ) { }

  ngOnInit() {
    this.id = this.activeRoute.snapshot.paramMap.get('id');
    if (this.id) {
      this.billService.getBill(this.id).subscribe(data => {
        this.billInfo = data;
      });
    }

    this.day = moment().toDate().getDay().toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });
    this.month = moment().toDate().getMonth().toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });
    this.year = moment().toDate().getFullYear() + 543;
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
