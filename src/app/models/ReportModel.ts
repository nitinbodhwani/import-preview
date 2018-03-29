import { ReportDataModel } from "./ReportDataModel";

export class ReportModel{
    ReportId : number;
    Name : string;
    ImportDate : Date;
    ReportDataList : Array<ReportDataModel>;
}