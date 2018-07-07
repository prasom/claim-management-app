import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingService } from '../../../shared/loading-service.service';
import { CarTypeService } from '../car-type.service';
import { CarTypeCreateModel, CarTypeViewModel } from '../car-type.interface';
import * as moment from 'moment';
@Component({
  selector: 'app-car-type-create',
  templateUrl: './car-type-create.component.html',
  styleUrls: ['./car-type-create.component.css']
})
export class CarTypeCreateComponent implements OnInit {
  submitForms: FormGroup;
  data: CarTypeViewModel;
  id: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private carTypeService: CarTypeService,
    private loadingService: LoadingService
  ) { }

  ngOnInit() {
    this.submitForms = this.fb.group({
      name: ['', Validators.required],
    });
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.carTypeService.getCarTypeById(this.id).subscribe(data => {
        this.data = data;
        this.submitForms.controls['name'].setValue(this.data.name);
        console.log(this.data);
      });
    }
  }

  save() {
    this.loadingService.show();
    if (this.id) {
      const request: CarTypeViewModel = {
        car_type_id: this.id,
        name: this.submitForms.get('name').value,
        create_date: moment().toDate(),
        delete_flag: false,
      };
      this.carTypeService.updateCarType(request).then(res => {
        this.loadingService.hide();
        this.router.navigate(['car-type-detail', { id: this.id }]);
      }).catch(ex => {
        this.loadingService.hide();
      });
    } else {
      const request: CarTypeCreateModel = {
        name: this.submitForms.get('name').value,
        create_date: moment().toDate(),
        delete_flag: false,
      };
      this.carTypeService.createCarType(request).then(res => {
        this.loadingService.hide();
        this.router.navigate(['car-type-detail', { id: res.insertId }]);
      }).catch(ex => {
        this.loadingService.hide();
      });
    }

  }

  discard() {
    this.router.navigate(['car-type-list']);
  }

}
