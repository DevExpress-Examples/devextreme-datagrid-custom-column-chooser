import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DxDataGridModule, DxPopupModule,  DxListModule } from "devextreme-angular";
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
