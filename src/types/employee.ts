export interface Employee {
  id: number;
  employeeId: string;
  name: string;
  email: string;
  department: string;
  position: string;
  status: "Active" | "Inactive";
}

export interface Attendance {
  id: number;
  employeeId: string;
  employeeName: string;
  date: string;
  timeIn: string;
  timeOut: string;
  status: "Present" | "Late" | "Absent";
}

export interface Performance {
  id: number;
  employeeId: string;
  employeeName: string;
  quality: number;
  productivity: number;
  teamwork: number;
  communication: number;
  overallScore: number;
  rating: string;
}