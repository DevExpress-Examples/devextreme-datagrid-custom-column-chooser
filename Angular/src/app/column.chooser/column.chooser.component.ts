import { AfterViewInit, Component, EventEmitter, Input, Output, } from '@angular/core';
import { Column } from '../app.service';
import { captionize } from "../utils";

@Component({
  selector: 'app-column-chooser',
  templateUrl: './column.chooser.component.html',
  styleUrls: ['./column.chooser.component.scss']
})
export class ColumnChooserComponent implements AfterViewInit {

  @Input() visible: boolean;
  @Input() columns: Column[];
  @Input() container: string;
  @Output() visibleChange = new EventEmitter();

  cancelOptions: any;
  applyOptions: any;
  listDataSource: Column[];

  public selectedItems: any = [];

  constructor() {
    this.cancelOptions = {
      text: "Cancel",
      onClick: (e) => {
        this.visible = false;
        this.visibleChange.emit(this.visible)
      }
    }
    this.applyOptions = {
      text: "Apply",
      onClick: (e) => {
        this.listDataSource.forEach((item) => {
          this.columns[item.index].visible = this.selectedItems.includes(
            item.dataField
          );
        });
        this.visible = false;
        this.visibleChange.emit(this.visible)
      }
    }
  }

  ngAfterViewInit() {
    this.listDataSource = JSON.parse(JSON.stringify(this.columns));
    this.listDataSource.forEach(column => {
      column.caption = captionize(column.dataField)
      if (column.visible)
        this.selectedItems.push(column.dataField);
    });

  }
}
