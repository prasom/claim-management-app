import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InsureService } from '../insure.service';
import { InsureViewmodel } from '../insure.interface';

@Component({
  selector: 'app-insure-detail',
  templateUrl: './insure-detail.component.html',
  styleUrls: ['./insure-detail.component.css']
})
export class InsureDetailComponent implements OnInit {
  data: InsureViewmodel;
  id: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private insureService: InsureService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.insureService.getInsureById(this.id).subscribe(data => {
      this.data = data;
      console.log(this.data);

    });
  }

  onAddCarType() {
    this.router.navigate(['/insure-create']);
  }

  onEditCarType() {
    this.router.navigate(['/insure-create', { id: this.id }]);
  }

  discard() {
    this.router.navigate(['/insure-list']);
  }

}
