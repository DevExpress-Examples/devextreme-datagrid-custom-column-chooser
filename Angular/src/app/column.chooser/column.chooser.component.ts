import {
  AfterViewInit, Component, EventEmitter, Input, Output,
} from '@angular/core';
import { DxButtonTypes } from 'devextreme-angular/ui/button';
import { Column } from '../app.service';
import { captionize } from '../utils';

@Component({
  selector: 'app-column-chooser',
  templateUrl: './column.chooser.component.html',
  styleUrls: ['./column.chooser.component.scss'],
})
export class ColumnChooserComponent implements AfterViewInit {
  @Input() visible = false;

  @Input() columns: Column[] = [];

  @Input() container = '';

  @Output() visibleChange = new EventEmitter();

  listDataSource: Column[] = [];

  public selectedItems: string[] = [];

  cancelOptions = {
    text: 'Cancel',
    onClick: (): void => {
      this.visible = false;
      this.visibleChange.emit(this.visible);
    },
  };

  applyOptions = {
    text: 'Apply',
    onClick: (): void => {
      this.listDataSource.forEach((item) => {
        this.columns[item.index].visible = this.selectedItems.includes(
          item.dataField,
        );
      });
      this.visible = false;
      this.visibleChange.emit(this.visible);
    },
  };

  ngAfterViewInit(): void {
    this.listDataSource = JSON.parse(JSON.stringify(this.columns));
    this.listDataSource.forEach((column) => {
      column.caption = captionize(column.dataField);
      if (column.visible) this.selectedItems.push(column.dataField);
    });
  }
}
