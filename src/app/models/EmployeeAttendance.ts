import { SwipeInfo } from "./SwipeInfo";

export class EmployeeAttendance{
    public EmployeeName: string;
    EmployeeCode: string;
    public AggregatedHours: number;
    SwipeInfoCollection: Array<SwipeInfo>;
    IsCollapsed: boolean;
    PanelId: string;
    DataGridId: string;
}