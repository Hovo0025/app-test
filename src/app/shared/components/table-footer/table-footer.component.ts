import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

import { PaginationConstants } from '@core/constants/pagination.constants';

@Component({
    selector: 'app-table-footer',
    templateUrl: './table-footer.component.html',
    styleUrls: ['./table-footer.component.scss']
})
export class TableFooterComponent implements OnInit {
  @Input() pagerCount: number;
  @Input() selected: number = 0;
  @Input() id: string;
  @Output() limitChange: EventEmitter<number> = new EventEmitter<number>();
  @Output() pagerChange: EventEmitter<number> = new EventEmitter<number>();

  defaultLimitValue = 10;
  constructor() {}

  ngOnInit(): void {
  }

  onLimitChange(limit) {
    this.limitChange.emit(PaginationConstants.userPaginationValues[limit]);
  }

  onTablePagerChange(page: number) {
    this.pagerChange.emit(page);
  }
}
