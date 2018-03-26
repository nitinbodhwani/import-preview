import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';


import { AppComponent } from './app.component';
import {MainPanelComponent} from './components/mainPanel/mainPanel.component';
import {ImportSectionComponent} from './components/importSection/importSection.component';
import {XLSXDirective} from './directives/xlsx.directive'
import { ImportReportComponent } from './components/import-report/import-report.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { NgTableComponent, NgTableFilteringDirective, NgTablePagingDirective, NgTableSortingDirective, Ng2TableModule } from 'ng2-table';


@NgModule({
  declarations: [
    AppComponent,
    MainPanelComponent,
    ImportSectionComponent,
    XLSXDirective,
    ImportReportComponent,
    DataTableComponent,
    //NgTableComponent, NgTableFilteringDirective, NgTablePagingDirective, NgTableSortingDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    Ng2TableModule
  ],
  providers: [],
  bootstrap: [AppComponent]  
  //bootstrap: [ImportReportComponent]
  //bootstrap: [DataTableComponent]  
})
export class AppModule { }
