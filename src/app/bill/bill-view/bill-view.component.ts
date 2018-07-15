import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { BillViewModel, BaseBillModel, BillFullViewModel } from '../bill.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { BillService } from '../bill.service';
import * as moment from 'moment';
import { ClaimService } from '../../claim/claim.service';
@Component({
  selector: 'app-bill-view',
  templateUrl: './bill-view.component.html',
  styleUrls: ['./bill-view.component.css']
})
export class BillViewComponent implements OnInit {
  billForms: FormGroup;
  billDetail: BillFullViewModel;
  billRequest: BaseBillModel;
  id: any;
  constructor(
    private fb: FormBuilder,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private billService: BillService,
    private claimService: ClaimService
  ) { }

  ngOnInit() {
    this.billForms = this.fb.group({
      claimNo: [''],
      amount: [''],
    });
    this.id = this.activeRoute.snapshot.paramMap.get('id');
    this.billService.getBill(this.id).subscribe(data => {
      this.billDetail = data;
    });
  }

  save() {
    if (this.billForms.valid) {
      this.billRequest = {
        claim_info_id: this.id,
        amount: this.billForms.get('amount').value,
        claim_no: this.billForms.get('claimNo').value,
        create_date: moment().toDate()
      };
      this.billService.createBill(this.billRequest).then(res => {
        this.claimService.updateBillStatus(1, this.id).then(res => {
          this.router.navigate(['bill-list']);
        });
      });
    }
  }

  print() {
    this.router.navigate(['print-bill', { id: this.id }]);
  }

  discard() {
    this.router.navigate(['bill-list']);
  }

}
