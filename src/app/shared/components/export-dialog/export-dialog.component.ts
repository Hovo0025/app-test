import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { User } from '@core/models';
import { ExportToService } from '@core/services/export-to.service';

@Component({
  selector: 'app-export-dialog',
  templateUrl: './export-dialog.component.html',
  styleUrls: ['./export-dialog.component.scss']
})
export class ExportDialogComponent implements OnInit {
  constructor(private exportToService: ExportToService,
    public dialogRef: MatDialogRef<ExportDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { users: User[], title: string },
  ) {}

  ngOnInit(): void {
    console.log('this.data', this.data);
  }

  onExportToCsv(): void {
    this.exportToService.exportToCsv(this.data.users);
  }

  onClose() {
    this.dialogRef.close();
  }
}
