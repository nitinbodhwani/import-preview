import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './/app-routing.module';
import { NgTableComponent, NgTableFilteringDirective, NgTablePagingDirective, NgTableSortingDirective, Ng2TableModule } from 'ng2-table';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { MainPanelComponent } from './components/mainPanel/mainPanel.component';
import { ImportSectionComponent } from './components/importSection/importSection.component';
import { XLSXDirective } from './directives/xlsx.directive';
import { DataTableComponent } from './components/data-table/data-table.component';
import { ImportTemplateComponent} from './components/importTemplate/importTemplate.component';
import { ReportPreviewComponent } from './components/reportPreview/reportPreview.component';


@NgModule({
  declarations: [
    AppComponent,
    MainPanelComponent,
    ImportSectionComponent,
    XLSXDirective,
    DataTableComponent,
    ImportTemplateComponent,
    ReportPreviewComponent
    //NgTableComponent, NgTableFilteringDirective, NgTablePagingDirective, NgTableSortingDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule.forRoot(),
    Ng2TableModule,
    AppRoutingModule
  ],
  providers: [],

  bootstrap: [AppComponent]
  //bootstrap: [ImportReportComponent]
  //bootstrap: [DataTableComponent]  

})
export class AppModule { }
