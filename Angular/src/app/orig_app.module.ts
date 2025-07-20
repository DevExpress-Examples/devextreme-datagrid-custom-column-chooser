import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DxDataGridModule } from "devextreme-angular/ui/data-grid";
import { DxPopupModule } from "devextreme-angular/ui/popup";
import { DxListModule } from "devextreme-angular/ui/list";
import { AppComponent } from './app.component';
import { ColumnChooserComponent } from './column.chooser/column.chooser.component';

@NgModule({
  declarations: [
    AppComponent,
    ColumnChooserComponent
  ],
  imports: [
    BrowserModule,
    DxDataGridModule,
    DxListModule,
    DxPopupModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
