import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { InsureService } from '../insure.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Router } from '@angular/router';
import { LoadingService } from '../../../shared/loading-service.service';
import { InsureViewmodel } from '../insure.interface';

@Component({
  selector: 'app-insure-list',
  templateUrl: './insure-list.component.html',
  styleUrls: ['./insure-list.component.css']
})
export class InsureListComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  dataSource = new MatTableDataSource();
  displayedColumns = ['id', 'name'];

  constructor(
    private router: Router,
    private insureService: InsureService,
    private loading: LoadingService
  ) { }

  ngOnInit() {
    this.onLoadData();
  }

  onLoadData() {
    this.loading.show();
    this.insureService.getInsure().subscribe(data => {
      console.log(data);
      this.loading.hide();
      this.dataSource.data = data;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  onAddInsure() {
    this.router.navigateByUrl('/insure-create');
  }

  gotoDetail(row: InsureViewmodel) {
    this.router.navigate(['/insure-detail', { id: row.insure_type_id }]);
  }

}
