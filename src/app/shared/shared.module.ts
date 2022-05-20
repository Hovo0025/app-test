import { NgModule } from '@angular/core';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { NgxPaginationModule } from 'ngx-pagination';

import { TableFooterComponent } from '@shared/components/table-footer/table-footer.component';
import { AppDefaultImgDirective } from './directives/app-default-img.directive';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { DateTimeFormatPipe } from '@shared/pipes/date-time-format.pipe';
import { ExportDialogComponent } from '@shared/components/export-dialog/export-dialog.component';
import { MaterialModule } from '@core/material/material.module';

@NgModule({
  imports: [
    ScrollingModule,
    NgxPaginationModule,
    MaterialModule
  ],
  declarations: [
    SpinnerComponent,
    AppDefaultImgDirective,
    TableFooterComponent,
    DateTimeFormatPipe,
    ExportDialogComponent
  ],
  exports: [
    NgxPaginationModule,
    MaterialModule,
    ScrollingModule,
    AppDefaultImgDirective,
    DateTimeFormatPipe,
    TableFooterComponent,
    SpinnerComponent,
    ExportDialogComponent
  ]
})
export class SharedModule {
}
