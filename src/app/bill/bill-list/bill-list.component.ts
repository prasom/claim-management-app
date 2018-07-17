import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BillService } from '../bill.service';
import { BillViewModel, BillFullViewModel } from '../bill.interface';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { FormControl } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-bill-list',
  templateUrl: './bill-list.component.html',
  styleUrls: ['./bill-list.component.css']
})
export class BillListComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns = ['insure_ref_key', 'brand', 'car_number', 'type', 'contact_tel', 'status'];
  dataSource = new MatTableDataSource<BillFullViewModel>();
  date: FormControl = new FormControl(moment());
  statuses: any = [
    { name: 'ทั้งหมด', id: 0 },
    { name: 'ทำรายการแล้ว', id: 1 },
    { name: 'ยังไม่ทำรายการ', id: 2 },
  ];
  selectedFilter = new FormControl();
  textFilter = new FormControl();
  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private billService: BillService
  ) { }

  ngOnInit() {
    this.billService.getBills().subscribe(data => {
      console.log(data);
      this.dataSource.data = data;
    });
    this.selectedFilter.setValue(0);
    this.dataSource.filterPredicate = this.createFilter();
    this.selectedFilter.valueChanges
      .subscribe(value => {
        this.dataSource.filter = value;
      });

    this.textFilter.valueChanges
      .subscribe(value => {
        this.dataSource.filter = value;
      });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  onFilter() {
    console.log(this.date);
    this.billService.getBills().subscribe(data => {
      console.log(data);
      this.dataSource.data = data;
      this.selectedFilter.setValue(0);
    });
  }

  onViewDetail(item: BillFullViewModel) {
    if (item.id_bill_history) {
      this.router.navigate(['bill-view', { id: item.id }]);
    } else {
      this.router.navigate(['bill-detail', { id: item.id }]);
    }
  }

  createFilter() {
    let filterFunction = (data: BillFullViewModel, filter: any): boolean => {
      if (typeof filter === 'string') {
        return data.brand ? data.brand.indexOf(filter) > -1 : false
          || data.car_number ? data.car_number.indexOf(filter) > -1 : false
            || data.insure_type_desc ? data.insure_type_desc.indexOf(filter) > -1 : false
              || data.car_type_desc ? data.car_type_desc.indexOf(filter) > -1 : false
                || data.contact_tel ? data.contact_tel.indexOf(filter) > -1 : false;
      } else {
        if (filter === 1) {
          return data.id_bill_history != null;
        } else if (filter === 2) {
          return data.id_bill_history == null;
        } else {
          return true;
        }
      }

    };
    return filterFunction;
  }

  applyFilter(filterValue) {
    console.log('applyFilter', filterValue);
    this.dataSource.filter = filterValue;
  }

}
