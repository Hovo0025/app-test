import {Injectable} from "@angular/core";

import { ExportToCsv } from 'export-to-csv';
import { User } from '@core/models';

@Injectable({
  providedIn: 'root'
})
export class ExportToService {
  constructor() {
  }

  public exportToCsv(users: User[]) {
    const options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: false,
      showTitle: false,
      filename: 'users',
      title: '',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
    };

    const dataToExport = [];
    users.forEach((user) => {
      dataToExport.push({
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        email: user.email,
        registeredAt: user.registered,
        postsCount: user.posts.length
      });
    });

    const csvExporter = new ExportToCsv(options);
    csvExporter.generateCsv(dataToExport);
  }
}
