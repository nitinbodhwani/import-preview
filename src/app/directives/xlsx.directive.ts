import { Directive, ElementRef, HostListener, Input, Output, EventEmitter } from '@angular/core';
import * as XLSX from  'xlsx'

@Directive({
  selector: '[xlsx]'
})
export class XLSXDirective{
  @Input() xlsxModel:any 

  @Output() fileData = new EventEmitter<string>();

  constructor(private el: ElementRef) { 
  }
 
  @HostListener('change')
  public onChange(){
    var data = {};
    var self = this;
		/* wire up file reader */
		const target:DataTransfer = (<DataTransfer>(this.el.nativeElement));
		if(target.files.length != 1) throw new Error("Cannot upload multiple files on the entry");
		const reader = new FileReader();
    reader.onload = function(file:any) {
    var wb = XLSX.read(file.target.result,{type:'binary'});
    wb.SheetNames.forEach((name) => {
            data[name.trim()] = XLSX.utils.sheet_to_json(wb.Sheets[name]);
          });
    self.xlsxModel = data;
    self.fileData.emit(self.xlsxModel);
        }
    reader.readAsBinaryString(target.files[0]);
    // this.xlsxModel = data;
    // this.fileData.emit(this.xlsxModel);
    //console.log(this.xlsxModel);
    //console.log(data);
    
  }
}