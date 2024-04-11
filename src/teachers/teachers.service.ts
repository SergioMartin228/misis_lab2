import { HttpStatus, Injectable, Module } from '@nestjs/common';
import { DatasourceService } from '../datasource/datasource.service';
import { Teacher } from './teacher.entity';

@Injectable()
export class TeachersService {
  constructor(private readonly datasourceService: DatasourceService) {}

  create(teacher: Teacher) {
    if (this.findOne(teacher.id)) return null;
    this.datasourceService.getTeachers().push(teacher);
    return teacher;
  }

  findOne(id: number) {
    return this.datasourceService
      .getTeachers()
      .find((teacher) => id === teacher.id);
  }

  findAll(): Teacher[] {
    return this.datasourceService.getTeachers();
  }

  update(id: number, updatedTeacher: Teacher) {
    const index = this.datasourceService
      .getTeachers()
      .findIndex((teacher) => id === teacher.id);

    if (index == -1) return null;
    this.datasourceService.getTeachers()[index] = updatedTeacher;

    return this.datasourceService.getTeachers()[index];
  }

  remove(id: number) {
    const index = this.datasourceService
      .getTeachers()
      .findIndex((teacher) => id === teacher.id);

    if (index == -1) return null;
    this.datasourceService.getTeachers().splice(index, 1);
    return HttpStatus.OK;
  }

  addGroupToTeacher(id: number, groupId: string) {
    const index = this.datasourceService
      .getTeachers()
      .findIndex((teacher) => id === teacher.id);
    const teacher = this.datasourceService.getTeachers()[index];
    if (index == -1 || teacher.groupIds.includes(groupId)) {
      return null;
    }
    this.datasourceService.getTeachers()[index].groupIds.push(groupId);
    return this.datasourceService.getTeachers()[index];
  }
}
