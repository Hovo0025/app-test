import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'dateTimeFormat'
})
export class DateTimeFormatPipe implements PipeTransform {

  transform(date: number, format: string): string {
    if (!date) {
      return '';
    }

    return moment(date).format(format);
  }

}
