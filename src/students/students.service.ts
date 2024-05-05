import { HttpStatus, Injectable, Module } from '@nestjs/common';
import { DatasourceService } from '../datasource/datasource.service';
import { Student } from './student.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from 'src/groups/group.entity';
import { Repository } from 'typeorm';
import { CreateStudentDto } from './dto/CreateStudent.dto';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>, // "внедряем" репозиторий Group в сервис
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}

  async create(newStudentDto: CreateStudentDto): Promise<Student> {
    const student = this.studentRepository.create();
    student.name = newStudentDto.name;
    student.age = newStudentDto.age;
    const group = await this.groupRepository.findOne({
      where: { id: newStudentDto.groupId },
      relations: { teachers: true },
    });
    student.group = group;
    await this.studentRepository.save(student); //сохраняем объект в БД
    return student;
  }

  async findOne(id: number): Promise<Student> {
    return this.studentRepository.findOne({
      where: { id },
      relations: { group: true },
    });
  }

  async findAll(): Promise<Student[]> {
    const students = await this.studentRepository.find({
      relations: {
        group: true,
      },
    });
    return students;
  }

  async update(id: number, updatedStudent: Student) {
    const student = await this.studentRepository.findOne({ where: { id } });
    student.age = updatedStudent.age;
    student.group = updatedStudent.group;
    student.name = updatedStudent.name;
    await this.studentRepository.save(student);
    return student;
  }

  async remove(id: number) {
    this.studentRepository.delete({ id });
  }
}
