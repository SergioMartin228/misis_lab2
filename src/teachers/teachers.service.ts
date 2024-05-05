import { HttpStatus, Injectable, Module } from '@nestjs/common';
import { DatasourceService } from '../datasource/datasource.service';
import { Teacher } from './teacher.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from 'src/groups/group.entity';
import { Student } from 'src/students/student.entity';
import { In, Repository } from 'typeorm';
import { CreateTeacherDto } from './dto/CreateTeacher.dto';

@Injectable()
export class TeachersService {
  constructor(
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>, // "внедряем" репозиторий Group в сервис
    @InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>,
  ) {}

  async create(newTeacherDto: CreateTeacherDto): Promise<Teacher> {
    const teacher = this.teacherRepository.create();
    teacher.name = newTeacherDto.name;
    teacher.subject = newTeacherDto.subject;
    const groups = await this.groupRepository.findBy({
      //получаем массив групп по id
      id: In(newTeacherDto.groupIDs),
    });
    teacher.groups = groups;
    await this.teacherRepository.save(teacher); //сохраняем объект в БД
    return teacher;
  }

  async findOne(id: number): Promise<Teacher> {
    return this.teacherRepository.findOne({
      where: { id },
      relations: { groups: true },
    });
  }

  async findAll(): Promise<Teacher[]> {
    const teachers = await this.teacherRepository.find({
      relations: {
        groups: true,
      },
    });
    return teachers;
  }

  async update(id: number, updatedTeacher: Teacher) {
    const teacher = await this.teacherRepository.findOne({ where: { id } });
    teacher.name = updatedTeacher.name;
    teacher.subject = updatedTeacher.subject;
    teacher.groups = updatedTeacher.groups;
    await this.teacherRepository.save(teacher);
    return teacher;
  }

  async remove(id: number) {
    this.teacherRepository.delete({ id });
  }
}
