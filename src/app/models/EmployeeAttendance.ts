import { SwipeInfo } from "./SwipeInfo";

export class EmployeeAttendance{
    EmployeeName: string;
    EmployeeCode: string;
    AggregatedHours: number;
    MEP: number;
    TDC: number;
    SwipeInfoCollection: Array<SwipeInfo>;
    IsCollapsed: boolean;
    PanelId: string;
    DataGridId: string;
}