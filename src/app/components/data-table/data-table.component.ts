import {Component, OnInit, ViewChild, Input} from '@angular/core';
import { NG_TABLE_DIRECTIVES, NgTableComponent, NgTableFilteringDirective, NgTablePagingDirective, NgTableSortingDirective } from 'ng2-table/ng2-table';
import { ReportColumnOptions, ReportColumns } from '../../typings';

@Component({
    selector: 'data-table',
    templateUrl: './data-table.component.html'
})
export class DataTableComponent implements OnInit{
    //@Input() data: Array<any> = [];
    //public rows:Array<any> = [];
    private data: Array<any> = [];
    // @Input() rows: Array<any> = [];
    // @Input() columns: Array<ReportColumnOptions>;
    public rows: Array<any> = [];
    public columns: Array<ReportColumnOptions> = [];
    // public columns:Array<ReportColumnOptions> = [
    //   {title: 'Name', name: 'name', filtering: {filterString: '', placeholder: 'Filter by name'}},
    //   {
    //     title: 'Position',
    //     name: 'position',
    //     sort: '',
    //     filtering: {filterString: '', placeholder: 'Filter by position'}
    //   },
    //   {title: 'Office', className: ['office-header', 'text-success'], name: 'office', sort: 'asc'},
    //   {title: 'Extn.', name: 'ext', sort: '', filtering: {filterString: '', placeholder: 'Filter by extn.'}},
    //   {title: 'Start date', className: ['text-warning'], name: 'startDate'},
    //   {title: 'Salary ($)', name: 'salary'}
    // ];
    public page:number = 1;
    public itemsPerPage:number = 10;
    public maxSize:number = 5;
    public numPages:number = 1;
    public length:number = 0;
  
    public config:any = {
      paging: true,
      sorting: {columns: this.columns},
      filtering: {filterString: ''},
      className: ['table-striped', 'table-bordered']
    };
  
    private reportData: Array<ReportColumns> =[
        {
            Node : '',
            Panel : '',
            Location : '',
            CardNumber : 0,
            CardName: '',
            Event : '',
            EventDateTime: '',
            Reader: '',
            Affiliation : '',
            AlarmText : ''
        }
    ]

    // private data:Array<any> = [
    // {
    //     name: 'Nitin Bodhwani',
    //     position: 'Position 1',
    //     office: 'KDI Bangalore',
    //     ext: '+91',
    //     startDate: '06-11-2017',
    //     salary: '99999999999'
    // },
    // {
    //     name: 'Ruthvika R',
    //     position: 'Position 2',
    //     office: 'KDI Bangalore',
    //     ext: '+91',
    //     startDate: '06-12-2017',
    //     salary: '99999999999'
    // },
    // {
    //     name: 'Deepa Sharma',
    //     position: 'Position 3',
    //     office: 'KDI Bangalore',
    //     ext: '+91',
    //     startDate: '06-10-2017',
    //     salary: '99999999999'
    // },
    // {
    //     name: 'Rakesh Singh',
    //     position: 'Position 1',
    //     office: 'KDI Bangalore',
    //     ext: '+91',
    //     startDate: '06-09-2017',
    //     salary: '99999999999'
    // },
    // {
    //     name: 'Bibhash',
    //     position: 'Position 2',
    //     office: 'KDI Bangalore',
    //     ext: '+91',
    //     startDate: '06-07-2017',
    //     salary: '99999999999'
    // }];
  
    public constructor() {
        this.length = this.data.length;
    }
  
    public ngOnInit():void {
      this.onChangeTable(this.config);
    }
  
    public changePage(page:any, data:Array<any> = this.data):Array<any> {
      let start = (page.page - 1) * page.itemsPerPage;
      let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
      return data.slice(start, end);
    }
  
    public changeSort(data:any, config:any):any {
      if (!config.sorting) {
        return data;
      }
  
      let columns = this.config.sorting.columns || [];
      let columnName:string = void 0;
      let sort:string = void 0;
  
      for (let i = 0; i < columns.length; i++) {
        if (columns[i].sort !== '' && columns[i].sort !== false) {
          columnName = columns[i].name;
          sort = columns[i].sort;
        }
      }
  
      if (!columnName) {
        return data;
      }
  
      // simple sorting
      return data.sort((previous:any, current:any) => {
        if (previous[columnName] > current[columnName]) {
          return sort === 'desc' ? -1 : 1;
        } else if (previous[columnName] < current[columnName]) {
          return sort === 'asc' ? -1 : 1;
        }
        return 0;
      });
    }
  
    public changeFilter(data:any, config:any):any {
      let filteredData:Array<any> = data;
      this.columns.forEach((column:any) => {
        if (column.filtering) {
          filteredData = filteredData.filter((item:any) => {
            return item[column.name].match(column.filtering.filterString);
          });
        }
      });
  
      if (!config.filtering) {
        return filteredData;
      }
  
      if (config.filtering.columnName) {
        return filteredData.filter((item:any) =>
          item[config.filtering.columnName].match(this.config.filtering.filterString));
      }
  
      let tempArray:Array<any> = [];
      filteredData.forEach((item:any) => {
        let flag = false;
        this.columns.forEach((column:any) => {
          if (item[column.name].toString().match(this.config.filtering.filterString)) {
            flag = true;
          }
        });
        if (flag) {
          tempArray.push(item);
        }
      });
      filteredData = tempArray;
  
      return filteredData;
    }
  
    public onChangeTable(config:any, page:any = {page: this.page, itemsPerPage: this.itemsPerPage}):any {
      if (config.filtering) {
        Object.assign(this.config.filtering, config.filtering);
      }
  
      if (config.sorting) {
        Object.assign(this.config.sorting, config.sorting);
      }
  
      let filteredData = this.changeFilter(this.data, this.config);
      let sortedData = this.changeSort(filteredData, this.config);
      this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
      this.length = sortedData.length;
    }
  
    public onCellClick(data: any): any {
      console.log(data);
    }

    public onDataChange():void {

        this.data = this.rows;
        //this.numPages = ((this.rows && this.rows.length) ? (this.rows.length / this.itemsPerPage) : 1 );
        this.itemsPerPage =  ((this.rows && this.rows.length) ? this.rows.length: 10 );
        this.onChangeTable(this.config);
    }
}