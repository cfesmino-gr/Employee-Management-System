export const DEPARTMENTS = [
  "Grocery Department",
  "Delivery Department",
  "Supervisors Department",
  "School Supply Department",
  "Meat Shop Department",
  "Bakery Department",
] as const;

export const EMPLOYEE_STATUSES = ["Active", "Inactive"] as const;

export const ATTENDANCE_STATUSES = ["Present", "Late", "Absent"] as const;

export const PERFORMANCE_RATINGS = [
  "Excellent",
  "Very Good",
  "Good",
  "Fair",
  "Needs Improvement",
] as const;

export const PERFORMANCE_WEIGHTS = {
  quality: 0.29,
  productivity: 0.29,
  teamwork: 0.24,
  communication: 0.18,
} as const;

export const PERFORMANCE_WEIGHT_LABEL =
  "Quality 29% • Productivity 29% • Teamwork 24% • Communication 18%";

export const SCORE_CRITERIA_LABELS: Record<string, string> = {
  quality: "Quality of Work",
  productivity: "Productivity",
  teamwork: "Teamwork",
  communication: "Communication",
};

export const DEPARTMENT_OPTIONS = DEPARTMENTS.map((department) => ({
  value: department,
  label: department,
}));

export const EMPLOYEE_STATUS_OPTIONS = EMPLOYEE_STATUSES.map((status) => ({
  value: status,
  label: status,
}));

export const ATTENDANCE_STATUS_OPTIONS = ATTENDANCE_STATUSES.map((status) => ({
  value: status,
  label: status,
}));

export function getRating(score: number): string {
  if (score >= 90) return "Excellent";
  if (score >= 80) return "Very Good";
  if (score >= 70) return "Good";
  if (score >= 60) return "Fair";
  return "Needs Improvement";
}

export function getRatingColor(rating: string): string {
  switch (rating) {
    case "Excellent":
      return "green";
    case "Very Good":
      return "blue";
    case "Good":
      return "orange";
    case "Fair":
      return "gold";
    default:
      return "red";
  }
}

export function getAttendanceStatusColor(
  status: (typeof ATTENDANCE_STATUSES)[number]
): string {
  switch (status) {
    case "Present":
      return "green";
    case "Late":
      return "orange";
    case "Absent":
      return "red";
    default:
      return "default";
  }
}