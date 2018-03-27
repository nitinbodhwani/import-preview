import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import {MainPanelComponent} from './components/mainPanel/mainPanel.component';
import {ImportSectionComponent} from './components/importSection/importSection.component';
import {XLSXDirective} from './directives/xlsx.directive';
import {SelectMonthYearPopUp} from './components/modalPopUps/selectMonthYearPopUp';
import { DataTableComponent } from './components/data-table/data-table.component';
import { NgTableComponent, NgTableFilteringDirective, NgTablePagingDirective, NgTableSortingDirective, Ng2TableModule } from 'ng2-table';
import {ImportTemplateComponent} from './components/importTemplate/importTemplate.component';


@NgModule({
  declarations: [
    AppComponent,
    MainPanelComponent,
    ImportSectionComponent,
    XLSXDirective,
    SelectMonthYearPopUp,
    DataTableComponent,
    ImportTemplateComponent
    //NgTableComponent, NgTableFilteringDirective, NgTablePagingDirective, NgTableSortingDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule.forRoot(),
    Ng2TableModule
  ],
  entryComponents: [
    SelectMonthYearPopUp,
],
  providers: [],

  bootstrap: [AppComponent],
  exports:[
    SelectMonthYearPopUp
  ]
  //bootstrap: [ImportReportComponent]
  //bootstrap: [DataTableComponent]  

})
export class AppModule { }
