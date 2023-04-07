export interface Course {
  aclevel: string;
  coursecredit: number;
  courseid: number;
  courseindex: string;
  coursename: string;
  unitname: string;
}

export interface CourseDetail {
  hvid: number;
  weekday: number;
  weekname: string;
  timeid: number;
  durtime: number;
  duration: number;
  schedType: number;
  schedTypeName: string;
  subjectName: string;
  compName: string;
  compId: number;
  roomName: string;
  buildingName: string;
  empName: string;
  durweek: number;
  firstdate: Date;
  chosenStudCount: number;
  numStudent: number;
  comment: string;
  time: string;
  subjectIndex: string;
  subjectCredit: number;
  courseid: number;
  empid: number;
  roomid: number;
  groupid: number;
}
