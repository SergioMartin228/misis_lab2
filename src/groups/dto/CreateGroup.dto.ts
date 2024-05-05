import { Student } from "src/students/student.entity";

export class CreateGroupDto
{
    name: string;
    course: number;
    institute: string;
    students: Student[];
    teacherIDs: number[];
    head?: Student;
}