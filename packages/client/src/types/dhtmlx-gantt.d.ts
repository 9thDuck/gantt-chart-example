import "dhtmlx-gantt";

declare global {
 interface GanttTemplates {
  parse_date(date: string): Date;
  format_date(date: Date): string;
 }
}
