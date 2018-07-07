import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClaimService } from '../claim.service';
import { DataSource } from '@angular/cdk/table';
import { Observable } from 'rxjs';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { LoadingService } from '../../shared/loading-service.service';
import { ClaimViewObject, ClaimInfoFullViewModel } from '../claim.interface';
import * as path from 'path';

const mysql = (<any>window).require('mysql');
const { remote } = (<any>window).require('electron');
const { BrowserWindow, dialog, shell } = remote;
const fs = (<any>window).require('fs');
const mainProcess = remote.require('./main.js');
let print_win: any;
let save_pdf_path: any;

@Component({
  selector: 'app-claim-list',
  templateUrl: './claim-list.component.html',
  styleUrls: ['./claim-list.component.css']
})


export class ClaimListComponent implements OnInit, AfterViewInit {

  displayedColumns = ['id', 'insure_ref_key', 'contact_date', 'brand', 'car_number', 'action'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private router: Router,
    private claimService: ClaimService,
    private loading: LoadingService,
  ) { }

  ngOnInit() {
    this.onLoadDate();
    document.addEventListener('DOMContentLoaded', function () {
      print_win = new BrowserWindow({ 'auto-hide-menu-bar': true });
      print_win.loadURL('http://github.com');
      print_win.show();

      print_win.webContents.on('did-finish-load', function () {
        document.getElementById('print_button').addEventListener('click', print);
        document.getElementById('save_pdf_button').addEventListener(
          'click', this.savePDF);
        document.getElementById('view_pdf_button').addEventListener(
          'click', this.viewPDF);
      });
      print_win.on('closed', function () {
        print_win = null;
      });
    });
  }

  getPDFPrintSettings() {
    let option: any = {
      landscape: false,
      marginsType: 0,
      printBackground: false,
      printSelectionOnly: false,
      pageSize: 'A4',
    };

    let layoutSetting: any = document.getElementById('layout-settings');
    option.landscape =
      layoutSetting.options[layoutSetting.selectedIndex].value === 'Landscape';
    let pageSizeSetting: any = document.getElementById('page-size-settings');
    option.pageSize =
      pageSizeSetting.options[pageSizeSetting.selectedIndex].text;
    let marginsSetting: any = document.getElementById('margin-settings');
    option.marginsType =
      // tslint:disable-next-line:radix
      parseInt(marginsSetting.options[marginsSetting.selectedIndex].value);

    return option;
  }

  savePDF() {
    if (!print_win) {
      dialog.showErrorBox('Error', 'The printing window isn\'t created');
      return;
    }
    dialog.showSaveDialog(print_win, {}, function (file_path) {
      if (file_path) {
        print_win.webContents.printToPDF(this.getPDFPrintSettings(), function (err, data) {
          if (err) {
            dialog.showErrorBox('Error', err);
            return;
          }
          fs.writeFile(file_path, data, function (err) {
            if (err) {
              dialog.showErrorBox('Error', err);
              return;
            }
            save_pdf_path = file_path;
            document.getElementById('output-log').innerHTML =
              '<p> Write PDF file: ' + save_pdf_path + ' successfully!</p>';
          });
        });
      }
    });
  }

  print(item: ClaimInfoFullViewModel) {
    this.router.navigate(['print-appointment-card', { id: item.id }]);
  }


  onLoadDate() {
    this.loading.show();
    try {
      this.claimService.getClaimList().subscribe(res => {
        this.loading.hide();
        this.dataSource.data = res;
      });
    } catch (error) {
      this.loading.hide();
      console.log(error);
    }

  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  onAddClaimInfo() {
    this.router.navigateByUrl('/claim-form-page');
  }

  gotoDetail(row: ClaimInfoFullViewModel) {
    console.log(row);
    this.router.navigate(['/claim-detail-page', { id: row.id }]);
  }

  applyFilter(filterValue) {
    this.dataSource.filter = filterValue;
  }
}

