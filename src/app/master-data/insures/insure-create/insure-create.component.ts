import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { InsureCreateModel, InsureViewmodel } from '../insure.interface';
import * as moment from 'moment';
import { InsureService } from '../insure.service';
import { LoadingService } from '../../../shared/loading-service.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-insure-create',
  templateUrl: './insure-create.component.html',
  styleUrls: ['./insure-create.component.css']
})
export class InsureCreateComponent implements OnInit {
  insureForms: FormGroup;
  id: any;
  data: InsureViewmodel;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private insureService: InsureService,
    private loadingService: LoadingService
  ) { }

  ngOnInit() {
    this.insureForms = this.fb.group({
      name: ['', Validators.required],
    });
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.insureService.getInsureById(this.id).subscribe(data => {
        this.data = data;
        this.insureForms.controls['name'].setValue(this.data.name);
        console.log(this.data);

      });
    }

  }

  save() {
    this.loadingService.show();
    if (this.id) {
      const request: InsureViewmodel = {
        insure_type_id: this.id,
        name: this.insureForms.get('name').value,
        create_date: moment().toDate(),
        delete_flag: false,
      };
      this.insureService.updateInsure(request).then(res => {
        this.loadingService.hide();
        this.router.navigate(['/insure-detail', { id: this.id }]);
      }).catch(ex => {
        this.loadingService.hide();
      });
    } else {
      const request: InsureCreateModel = {
        name: this.insureForms.get('name').value,
        create_date: moment().toDate(),
        delete_flag: false,
      };
      this.insureService.createInsure(request).then(res => {
        this.loadingService.hide();
        this.router.navigate(['/insure-detail', { id: res.insertId }]);
      }).catch(ex => {
        this.loadingService.hide();
      });
    }

  }

  discard() {
    this.router.navigate(['insure-list']);
  }

}
