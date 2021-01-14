import { Component, ViewChild } from "@angular/core";
import { Customer, Column, Service } from "./app.service";
import { ColumnChooserComponent } from "./column.chooser/column.chooser.component";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [Service]
})

export class AppComponent {
  customers: Customer[];
  columns: Column[];
  isColumnChooserVisible = false;
  @ViewChild(ColumnChooserComponent) columnChooser: ColumnChooserComponent;

  constructor(service: Service) {
    this.customers = service.getCustomers();

    this.columns = service.getColumns();

  }

  onToolbarPreparing(e) {
    e.toolbarOptions.items.push({
      widget: "dxButton",
      options: {
        icon: "columnchooser",
        onClick: () => {
          this.isColumnChooserVisible = true;
        }
      },
      location: "after"
    });
  }

  onOptionChanged(e) {
    
    let listSelectedItems = this.columnChooser.selectedItems;

    if (e.name == "columns" && e.fullName.includes("visible")) {
      var columnIndex = parseInt(e.fullName.charAt(8));
      if (e.value) {
        listSelectedItems.push(columnIndex);
      } else {
        let index = listSelectedItems.indexOf(columnIndex);
        if (index > -1) listSelectedItems.splice(index, 1);
      }
    }
  }
}


