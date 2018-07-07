import { Component, OnInit } from '@angular/core';
import { ParkingService } from '../parking.service';
import { ParkingHistoryViewModel, ParkingHistoryFullViewModel } from '../parking.interface';
import { FormControl } from '@angular/forms';
import * as moment from 'moment';
import { ClaimViewObject } from '../../claim/claim.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-parking-list',
  templateUrl: './parking-list.component.html',
  styleUrls: ['./parking-list.component.css']
})
export class ParkingListComponent implements OnInit {

  displayedColumns = ['insure_ref_key', 'brand', 'car_number', 'type', 'contact_tel', 'status'];
  dataSource = new MatTableDataSource<ParkingHistoryFullViewModel>();
  date: FormControl = new FormControl(moment());
  statuses: any = [
    { name: 'ทั้งหมด', id: 0 },
    { name: 'ทำรายการแล้ว', id: 1 },
    { name: 'ยังไม่ทำรายการ', id: 2 },
  ];
  selectedFilter = new FormControl();
  constructor(
    private parkingService: ParkingService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.parkingService.getParkingList(null).subscribe(data => {
      console.log(data);
      this.dataSource.data = data;
    });
    this.selectedFilter.setValue(0);
    this.dataSource.filterPredicate = this.createFilter();
    this.selectedFilter.valueChanges
      .subscribe(value => {
        this.dataSource.filter = value;
      });
  }

  onFilter() {
    console.log(this.date);
    this.parkingService.getParkingList(this.date.value).subscribe(data => {
      console.log(data);
      this.dataSource.data = data;
      this.selectedFilter.setValue(0);
    });
  }

  onViewDetail(item: ParkingHistoryFullViewModel) {
    this.router.navigate(['parking-detail', { id: item.id }]);
  }

  createFilter() {
    let filterFunction = (data: ParkingHistoryViewModel, filter): boolean => {
      if (filter === 1) {
        return data.id_parking_history != null;
      } else if (filter === 2) {
        return data.id_parking_history == null;
      } else {
        return true;
      }
    };
    return filterFunction;
  }

}
