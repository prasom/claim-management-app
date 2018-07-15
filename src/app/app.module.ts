
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CdkTableModule } from '@angular/cdk/table';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,
  MAT_DATE_LOCALE,
  DateAdapter,
  MAT_DATE_FORMATS,
} from '@angular/material';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { LayoutModule } from '@angular/cdk/layout';
import { DbConnectService } from './shared/db-connect.service';

import { ClaimListComponent } from './claim/claim-list/claim-list.component';
import { ClaimFormComponent } from './claim/claim-form/claim-form.component';
import { ClaimDetailComponent } from './claim/claim-detail/claim-detail.component';
import { ClaimService } from './claim/claim.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { InsureListComponent } from './master-data/insures/insure-list/insure-list.component';
import { InsureCreateComponent } from './master-data/insures/insure-create/insure-create.component';
import { InsureService } from './master-data/insures/insure.service';
import { LoadingDialogComponent } from './loading-dialog/loading-dialog.component';
import { LoadingService } from './shared/loading-service.service';
import { MatSelectSearchComponent } from './mat-select-search/mat-select-search.component';
import { MatSelectSearchModule } from 'src/app/mat-select-search/mat-select-search.module';
import { CarTypeListComponent } from './master-data/cars/car-type-list/car-type-list.component';
import { CarTypeCreateComponent } from './master-data/cars/car-type-create/car-type-create.component';
import { CarTypeDetailComponent } from './master-data/cars/car-type-detail/car-type-detail.component';
import { CarTypeService } from './master-data/cars/car-type.service';
import { InsureDetailComponent } from './master-data/insures/insure-detail/insure-detail.component';
import { ParkingListComponent } from './parking/parking-list/parking-list.component';
import { ParkingDetailComponent } from './parking/parking-detail/parking-detail.component';
import { ParkingService } from './parking/parking.service';
import { BillListComponent } from './bill/bill-list/bill-list.component';
import { BillDetailComponent } from './bill/bill-detail/bill-detail.component';
import { PrintAppointmentCardComponent } from './print-forms/print-appointment-card/print-appointment-card.component';
import { PrintBillComponent } from './print-forms/print-bill/print-bill.component';
import { BillService } from './bill/bill.service';
import { DateThPipe } from './shared/date.pipe';
import { FilterPipe } from './shared/filter.pipe';
import { CompanySettingComponent } from './company-setting/company-setting.component';

const appRoutes: Routes = [
  { path: 'claim-list-page', component: ClaimListComponent },
  { path: 'claim-form-page', component: ClaimFormComponent },
  { path: 'claim-detail-page', component: ClaimDetailComponent },
  { path: 'insure-list', component: InsureListComponent },
  { path: 'insure-create', component: InsureCreateComponent },
  { path: 'insure-detail', component: InsureDetailComponent },
  { path: 'car-type-list', component: CarTypeListComponent },
  { path: 'car-type-create', component: CarTypeCreateComponent },
  { path: 'car-type-detail', component: CarTypeDetailComponent },
  { path: 'parking-list', component: ParkingListComponent },
  { path: 'parking-detail', component: ParkingDetailComponent },
  { path: 'bill-list', component: BillListComponent },
  { path: 'bill-detail', component: BillDetailComponent },
  { path: 'print-appointment-card', component: PrintAppointmentCardComponent },
  { path: 'print-bill', component: PrintBillComponent },
  { path: 'company-setting', component: CompanySettingComponent },
  { path: '**', redirectTo: '/claim-list-page', pathMatch: 'full' },
];


@NgModule({
  exports: [
    CdkTableModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    MatSelectSearchModule,
  ]
})
export class DemoMaterialModule { }

@NgModule({
  declarations: [
    AppComponent,
    ClaimListComponent,
    ClaimFormComponent,
    ClaimDetailComponent,
    InsureListComponent,
    InsureCreateComponent,
    LoadingDialogComponent,
    CarTypeListComponent,
    CarTypeCreateComponent,
    CarTypeDetailComponent,
    InsureDetailComponent,
    ParkingListComponent,
    ParkingDetailComponent,
    BillListComponent,
    BillDetailComponent,
    PrintAppointmentCardComponent,
    PrintBillComponent,
    CompanySettingComponent,
    DateThPipe,
    FilterPipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    LayoutModule,
    DemoMaterialModule,
    FlexLayoutModule,
    RouterModule.forRoot(appRoutes, { enableTracing: false, useHash: true })
  ],
  providers: [
    DbConnectService,
    ClaimService,
    InsureService,
    LoadingService,
    CarTypeService,
    ParkingService,
    BillService,
    { provide: MAT_DATE_LOCALE, useValue: 'th-TH' },

    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ],
  entryComponents: [LoadingDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
