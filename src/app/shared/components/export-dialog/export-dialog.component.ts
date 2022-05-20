import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import * as htmlToImage from 'html-to-image';

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
  }

  onExportToCsv(): void {
    this.exportToService.exportToCsv(this.data.users);
    this.dialogRef.close();
  }

  generateImage(){
    htmlToImage.toJpeg(document.getElementById('userList'), { quality: 0.95 })
      .then( (dataUrl) => {
        const link = document.createElement('a');
        link.download = 'users.jpeg';
        link.href = dataUrl;
        link.click();
        this.dialogRef.close();
      });
  }

  onClose() {
    this.dialogRef.close();
  }
}
