import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Route } from '@angular/router';
import { ClaimService } from '../claim.service';
import { ClaimViewObject, ClaimInfoFullViewModel } from '../claim.interface';

@Component({
  selector: 'app-claim-detail',
  templateUrl: './claim-detail.component.html',
  styleUrls: ['./claim-detail.component.css']
})
export class ClaimDetailComponent implements OnInit {
  claimInfo: ClaimInfoFullViewModel;
  id: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private claimService: ClaimService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.claimService.getClaimById(this.id).subscribe(data => {
      this.claimInfo = data;
      console.log(this.claimInfo);

    });
  }

  edit() {
    this.router.navigate(['claim-form-page', { id: this.id }]);
  }
  add() {
    this.router.navigate(['claim-form-page']);
  }
  discard() {
    this.router.navigate(['claim-list-page']);
  }

}
