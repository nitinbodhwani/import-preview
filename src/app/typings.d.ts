export interface FilterOptions{
    filterString: string;
    placeholder: string
}

export interface IReportColumnOptions{
    title: string,
    name: string,
    filtering?: FilterOptions,
    sort?: string,
    className?: Array<string>
}

export interface ReportColumns{
    Node: string,
    Panel: string,
    Event: string,
    EventDateTime: string,
    CardNumber: number,
    CardName: string,
    Location: string,
    Reader: string,
    Affiliation: string,
    AlarmText: string
}
export interface ReportRow{
    ColumnName: string,
    Value: string
}

export interface IReportDataModel{
    ReportDataId: number,
    ReportId: number,
    Node: string,
    Panel: string,
    Event: string,
    EventDateTime: string,
    CardNumber: number,
    CardName: string,
    Location: string,
    ReaderId: number,
    In: string,
    Out: string,
    Affiliation: string,
    AlarmText: string
}

export interface IReportModel{
    ReportId : number,
    Name : string,
    ImportDate : string,
    ReportDataList : Array<IReportDataModel>
}

export interface ISwipeInfo{
    EventDate: string;
    Location: string;
    InTime: string;
    OutTime: string;
    TotalHours: number;
}

export interface IEmployeeAttendance{
    EmployeeName: string;
    EmployeeCode: string;
    AggregatedHours: number;
    MEP: number;
    TDC: number;
    SwipeInfoCollection: Array<ISwipeInfo>;
}