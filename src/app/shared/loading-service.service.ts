import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { LoadingDialogComponent } from '../loading-dialog/loading-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  dialogRef: any;
  constructor(
    public dialog: MatDialog
  ) { }
  show(): void {
    this.dialogRef = this.dialog.open(LoadingDialogComponent, {});
  }

  hide(): void {
    this.dialogRef.close();
  }
}
