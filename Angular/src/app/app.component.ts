import { Component, ViewChild } from '@angular/core';
import { DxDataGridTypes } from 'devextreme-angular/ui/data-grid';
import { Customer, Column, Service } from './app.service';
import { ColumnChooserComponent } from './column.chooser/column.chooser.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [Service],
  standalone: false,
})
export class AppComponent {
  @ViewChild(ColumnChooserComponent, { static: false }) columnChooser!: ColumnChooserComponent;

  customers: Customer[];

  columns: Column[];

  isColumnChooserVisible = false;

  constructor(service: Service) {
    this.customers = service.getCustomers();
    this.columns = service.getColumns();
  }

  onToolbarPreparing(e: DxDataGridTypes.ToolbarPreparingEvent): void {
    e.toolbarOptions?.items?.push({
      widget: 'dxButton',
      options: {
        elementAttr: {
          id: 'myColumnChooser',
        },
        icon: 'columnchooser',
        onClick: (): void => {
          this.isColumnChooserVisible = true;
        },
      },
      location: 'after',
    });
  }
}
