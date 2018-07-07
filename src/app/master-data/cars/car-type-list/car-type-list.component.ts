import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Router } from '@angular/router';
import { CarTypeService } from '../car-type.service';
import { LoadingService } from '../../../shared/loading-service.service';
import { CarTypeViewModel } from '../car-type.interface';

@Component({
  selector: 'app-car-type-list',
  templateUrl: './car-type-list.component.html',
  styleUrls: ['./car-type-list.component.css']
})
export class CarTypeListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  dataSource = new MatTableDataSource();
  displayedColumns = ['id', 'name'];

  constructor(
    private router: Router,
    private carTypeService: CarTypeService,
    private loading: LoadingService
  ) { }

  ngOnInit() {
    this.onLoadData();
  }

  onLoadData() {
    this.loading.show();
    this.carTypeService.getCarType().subscribe(data => {
      console.log(data);
      this.loading.hide();
      this.dataSource.data = data;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  onAddCarType() {
    this.router.navigate(['/car-type-create']);
  }

  gotoDetail(row: CarTypeViewModel) {
    this.router.navigate(['/car-type-detail', { id: row.car_type_id }]);
  }
}
