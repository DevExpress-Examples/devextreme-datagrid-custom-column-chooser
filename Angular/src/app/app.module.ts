import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { DxPopupModule } from 'devextreme-angular/ui/popup';
import { DxListModule } from 'devextreme-angular/ui/list';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ColumnChooserComponent } from './column.chooser/column.chooser.component';

@NgModule({
  declarations: [
    AppComponent,
    ColumnChooserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DxDataGridModule,
    DxPopupModule,
    DxListModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
