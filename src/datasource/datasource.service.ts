import { Injectable } from '@nestjs/common';
import { Group } from 'src/groups/group.entity';
import { Student } from 'src/students/student.entity';
import { Teacher } from 'src/teachers/teacher.entity';

@Injectable()
export class DatasourceService {
  private groups: Group[] = [
    {
      name: 'БИВТ',
      entryYear: 22,
      groupNumber: 1,
      course: 2,
      institute: 'ИКН',
      studentsCount: 30,
      head: 'Голокова Софья',
    },
  ];

  private students: Student[] = [
    {
      id: 1,
      name: 'Sergey',
      age: 19,
      groupId: 'БИВТ-22-1',
    },
  ];

  private teachers: Teacher[] = [new Teacher(1, 'Ulvi', 'Rksp')];

  getGroups(): Group[] {
    return this.groups;
  }

  getStudents(): Student[] {
    return this.students;
  }

  getTeachers(): Teacher[] {
    return this.teachers;
  }
}
