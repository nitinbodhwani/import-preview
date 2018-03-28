import { ReportDataModel } from "./ReportDataModel";

export class ReportModel{
    ReportId : number;
    Name : string;
    Month : number;
    Year : number;
    ImportDate : Date;
    ReportDataList : Array<ReportDataModel>;
}