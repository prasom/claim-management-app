import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClaimCreateObject, ClaimViewObject } from '../claim.interface';
import { ClaimService } from '../claim.service';
import * as moment from 'moment';
import { InsureService } from '../../master-data/insures/insure.service';
import { InsureViewmodel } from '../../master-data/insures/insure.interface';
import { LoadingService } from '../../shared/loading-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { takeUntil, take } from 'rxjs/operators';
import { Subject, ReplaySubject } from 'rxjs';
import { MatSelect } from '@angular/material';
import { CarTypeViewModel } from '../../master-data/cars/car-type.interface';
import { CarTypeService } from '../../master-data/cars/car-type.service';

@Component({
  selector: 'app-claim-form',
  templateUrl: './claim-form.component.html',
  styleUrls: ['./claim-form.component.css']
})
export class ClaimFormComponent implements OnInit, AfterViewInit, OnDestroy {
  insuresDefault: InsureViewmodel[] = [{
    insure_type_id: null,
    name: '',
    create_date: null,
    delete_flag: null
  }];
  carTypeDefault: CarTypeViewModel[] = [{
    car_type_id: null,
    name: '',
    create_date: null,
    delete_flag: null
  }];
  insures: InsureViewmodel[] = [];
  insuresOg: InsureViewmodel[] = [];
  carTypes: CarTypeViewModel[] = [];
  carTypesOg: CarTypeViewModel[] = [];
  claimForms: FormGroup;

  /** control for the MatSelect filter keyword */
  public insureFilterCtrl: FormControl = new FormControl();
  public carTypeFilterCtrl: FormControl = new FormControl();

  private _onDestroy = new Subject<void>();
  /** list of banks filtered by search keyword */
  public filteredInsures: ReplaySubject<InsureViewmodel[]> = new ReplaySubject<InsureViewmodel[]>(1);
  public filteredCarTypes: ReplaySubject<CarTypeViewModel[]> = new ReplaySubject<CarTypeViewModel[]>(1);



  @ViewChild('insureSelect') insureSelect: MatSelect;
  @ViewChild('carTypeSelect') carTypeSelect: MatSelect;

  id: any;
  claimRequest: ClaimCreateObject = {
    contact_date: null,
    insure_ref_key: '',
    brand: '',
    car_number: '',
    customer_type: '',
    service_level: '',
    is_parking: false,
    parking_date: null,
    create_date: null,
    update_date: null,
    create_by: '',
    car_type_id: '',
    contact_tel: '',
    car_type_other: '',
  };
  constructor(
    private fb: FormBuilder,
    private claimService: ClaimService,
    private insureService: InsureService,
    private carTypeService: CarTypeService,
    private loading: LoadingService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.claimForms = this.fb.group({
      dateContact: ['', Validators.required],
      insureType: [null, Validators.required],
      brand: ['', Validators.required],
      carNumber: ['', Validators.required],
      customerType: ['', Validators.required],
      serviceLevel: ['', Validators.required],
      isParking: ['', Validators.required],
      parkingDate: [''],
      contactTel: [''],
      carType: [null, Validators.required],
    });

    this.insureService.getInsure().subscribe(data => {
      this.insures = this.copyInsures(data);
      this.insuresOg = this.copyInsures(data);
      this.insures.splice(0, 0, this.insuresDefault[0]);
      this.insuresOg.splice(0, 0, this.insuresDefault[0]);

    });

    this.carTypeService.getCarType().subscribe(data => {
      this.carTypes = this.copyCarTypes(data);
      this.carTypesOg = this.copyCarTypes(data);
      this.carTypes.splice(0, 0, this.carTypeDefault[0]);
      this.carTypesOg.splice(0, 0, this.carTypeDefault[0]);
    });

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.getClaimDetail();
    }
    // load the initial bank list
    this.filteredInsures.next(this.insures.slice());
    this.insureFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterInsures();
      });

    this.filteredCarTypes.next(this.carTypes.slice());
    this.carTypeFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterCarTypes();
      });
  }

  ngAfterViewInit() {
    // this.setInitialValue();
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  private setInitialValue() {
    this.filteredInsures
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        this.insureSelect.compareWith = (a: InsureViewmodel, b: InsureViewmodel) => a.insure_type_id === b.insure_type_id;
      });

    this.filteredCarTypes
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        this.carTypeSelect.compareWith = (a: CarTypeViewModel, b: CarTypeViewModel) => a.car_type_id === b.car_type_id;
      });
  }

  myInsureFilter(item) {
    console.log('myInsureFilter', item);

  }

  private filterInsures() {
    debugger;
    if (!this.insures) {
      return;
    }
    this.insures = this.copyInsures(this.insuresOg);
    // get the search keyword
    let search = this.insureFilterCtrl.value;
    if (!search) {
      this.filteredInsures.next(this.insures.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredInsures.next(
      this.insures = this.insures.filter(insure => insure.name.toLowerCase().indexOf(search) > -1)
    );
  }

  private filterCarTypes() {
    if (!this.insures) {
      return;
    }
    this.carTypes = this.copyCarTypes(this.carTypesOg);
    // get the search keyword
    let search = this.carTypeFilterCtrl.value;
    if (!search) {
      this.filteredCarTypes.next(this.carTypes.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredCarTypes.next(
      this.carTypes = this.carTypes.filter(type => type.name.toLowerCase().indexOf(search) > -1)
    );
  }

  getClaimDetail() {
    this.claimService.getClaimById(this.id).subscribe(data => {
      this.claimForms.controls['dateContact'].setValue(data.contact_date);
      this.claimForms.controls['insureType'].setValue(parseInt(data.insure_ref_key));
      this.claimForms.controls['carType'].setValue(data.car_type_id);
      this.claimForms.controls['brand'].setValue(data.brand);
      this.claimForms.controls['carNumber'].setValue(data.car_number);
      this.claimForms.controls['contactTel'].setValue(data.contact_tel);
      this.claimForms.controls['customerType'].setValue(data.customer_type);
      this.claimForms.controls['serviceLevel'].setValue(data.service_level);
      this.claimForms.controls['isParking'].setValue(data.is_parking);
      this.claimForms.controls['parkingDate'].setValue(data.parking_date);
    });
  }

  save() {
    this.loading.show();
    try {
      if (this.id) {
        const request: ClaimViewObject = {
          id: this.id,
          contact_date: moment(this.claimForms.get('dateContact').value).toDate(),
          insure_ref_key: this.claimForms.get('insureType').value,
          brand: this.claimForms.get('brand').value,
          car_number: this.claimForms.get('carNumber').value,
          customer_type: this.claimForms.get('customerType').value,
          service_level: this.claimForms.get('serviceLevel').value,
          is_parking: this.claimForms.get('isParking').value,
          parking_date: moment(this.claimForms.get('parkingDate').value).toDate(),
          create_date: moment().toDate(),
          update_date: moment().toDate(),
          create_by: 'demo',
          car_type_id: this.claimForms.get('carType').value,
          contact_tel: this.claimForms.get('contactTel').value,
          car_type_other: '',
        };
        this.claimService.updateClaimInfo(request).then(res => {
          this.loading.hide();
          console.log(res);
          this.router.navigate(['/claim-detail-page', { id: this.id }]);

        }).catch(ex => {
          this.loading.hide();
          console.log(ex);
        });
      } else {
        this.claimRequest = {
          contact_date: moment(this.claimForms.get('dateContact').value).toDate(),
          insure_ref_key: this.claimForms.get('insureType').value,
          brand: this.claimForms.get('brand').value,
          car_number: this.claimForms.get('carNumber').value,
          customer_type: this.claimForms.get('customerType').value,
          service_level: this.claimForms.get('serviceLevel').value,
          is_parking: this.claimForms.get('isParking').value,
          parking_date: moment(this.claimForms.get('parkingDate').value).toDate(),
          create_date: moment().toDate(),
          update_date: moment().toDate(),
          create_by: 'demo',
          car_type_id: this.claimForms.get('carType').value,
          contact_tel: this.claimForms.get('contactTel').value,
          car_type_other: '',
        };
        this.claimService.createClaim(this.claimRequest).then(res => {
          this.loading.hide();
          console.log(res);
          this.router.navigateByUrl('/claim-list-page');

        }).catch(ex => {
          this.loading.hide();
          console.log(ex);
        });
      }

    } catch (error) {
      this.loading.hide();
    }

  }

  discard() {
    this.router.navigate(['claim-list-page']);
  }

  private copyInsures(values: InsureViewmodel[]) {
    let newInsures: InsureViewmodel[] = [];
    if (values && values.length > 0) {
      values.forEach(v => {
        newInsures.push({ ...v });
      });
    }
    return newInsures;
  }

  private copyCarTypes(values: CarTypeViewModel[]) {
    let newCarTypes: CarTypeViewModel[] = [];
    if (values && values.length > 0) {
      values.forEach(v => {
        newCarTypes.push({ ...v });
      });
    }
    return newCarTypes;
  }

}
