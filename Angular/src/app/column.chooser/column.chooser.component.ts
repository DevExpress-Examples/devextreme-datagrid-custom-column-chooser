import {
  Component, EventEmitter, Input, OnInit, Output,
  ChangeDetectionStrategy
} from '@angular/core';
import { Column } from '../app.service';
import { captionize } from '../utils';

@Component({
  selector: 'app-column-chooser',
  templateUrl: './column.chooser.component.html',
  styleUrls: ['./column.chooser.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false,
})
export class ColumnChooserComponent implements OnInit {
  @Input() visible = false;

  @Input() columns: Column[] = [];

  @Input() container = '';

  @Input() button = '';

  @Output() visibleChange = new EventEmitter();

  listDataSource: Column[] = [];

  positionOf = '';

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

  ngOnInit(): void {
    this.listDataSource = JSON.parse(JSON.stringify(this.columns));
    this.positionOf = `${this.container} ${this.button}`;
    this.listDataSource.forEach((column) => {
      column.caption = captionize(column.dataField);
      if (column.visible) this.selectedItems.push(column.dataField);
    });
  }
}
