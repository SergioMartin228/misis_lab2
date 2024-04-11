import { HttpStatus, Injectable, Module } from '@nestjs/common';
import { DatasourceService } from '../datasource/datasource.service';
import { Student } from './student.entity';

@Injectable()
export class StudentsService {
  constructor(private readonly datasourceService: DatasourceService) {}

  create(student: Student) {
    if (this.findOne(student.id)) return null;
    this.datasourceService.getStudents().push(student);
    return student;
  }

  findOne(id: number) {
    return this.datasourceService
      .getStudents()
      .find((student) => id === student.id);
  }

  findAll(): Student[] {
    return this.datasourceService.getStudents();
  }

  update(id: number, updatedStudent: Student) {
    const index = this.datasourceService
      .getStudents()
      .findIndex((student) => id === student.id);

    if (index == -1) return null;
    this.datasourceService.getStudents()[index] = updatedStudent;

    return this.datasourceService.getStudents()[index];
  }

  remove(id: number) {
    const index = this.datasourceService
      .getStudents()
      .findIndex((student) => id === student.id);

    if (index == -1) return null;
    this.datasourceService.getStudents().splice(index, 1);
    return HttpStatus.OK;
  }
}
