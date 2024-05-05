import { HttpStatus, Injectable, Module } from '@nestjs/common';
import { DatasourceService } from '../datasource/datasource.service';
import { Group } from './group.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Teacher } from 'src/teachers/teacher.entity';
import { Student } from 'src/students/student.entity';
import { CreateGroupDto } from './dto/CreateGroup.dto';
import { IncompleteGroupDto } from './dto/IncompleteGroup.dto';

@Injectable()
export class GroupsService {
  //constructor(private readonly datasourceService: DatasourceService) {}
  constructor(
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>, // "внедряем" репозиторий Group в сервис
    @InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>,
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}

  // create(group: Group) {
  //   if (this.findOne(group.id)) return null;
  //   this.datasourceService.getGroups().push(group);
  //   return group;
  // }
  async create(newGroupDto: CreateGroupDto): Promise<Group> {
    //получаем объект CreateGroupDto
    const group = this.groupRepository.create(); //создаем объект Group из репозитория
    group.name = newGroupDto.name; //заполняем поля объекта Group
    group.course = newGroupDto.course;
    group.institute = newGroupDto.institute;
    group.students = newGroupDto.students;
    group.head = newGroupDto.head;
    const teachers = await this.teacherRepository.findBy({
      //получаем массив преподавателей по id
      id: In(newGroupDto.teacherIDs),
    });
    group.teachers = teachers;
    await this.groupRepository.save(group); //сохраняем объект Author в БД
    return group; //возвращаем объект Author
  }

  // findOne(id: number) {
  //   return this.datasourceService.getGroups().find((group) => id === group.id);
  // }
  async findOne(id: number): Promise<Group> {
    return this.groupRepository.findOne({
      where: { id },
      relations: { teachers: true, students:true },
    });
  }

  // findAll(): Group[] {
  //   return this.datasourceService.getGroups();
  // }
  async findAll(): Promise<Group[]> {
    const groups = await this.groupRepository.find({
      relations: {
        teachers: true,
        students: true
      },
    });
    return groups;
  }

  async findIncomplete(): Promise<IncompleteGroupDto[]> {
    const groups = await this.groupRepository.find();

    const incompleteGroups: IncompleteGroupDto[] = groups.map((group) => {
      const incompleteGroup = new IncompleteGroupDto();
      incompleteGroup.id = group.id;
      incompleteGroup.name = group.name;
      return incompleteGroup;
    });
    return incompleteGroups;
  }

  // update(id: number, updatedGroup: Group) {
  //   const index = this.datasourceService
  //     .getGroups()
  //     .findIndex((group) => id === group.id);
  //   if (index == -1) return null;
  //   this.datasourceService.getGroups()[index] = updatedGroup;

  //   return this.datasourceService.getGroups()[index];
  // }
  async update(id: number, updatedGroup: Group) {
    const group = await this.groupRepository.findOne({ where: { id } });
    group.name = updatedGroup.name;
    group.course = updatedGroup.course;
    group.institute = updatedGroup.institute;
    group.students = updatedGroup.students;
    group.teachers = updatedGroup.teachers;
    group.head = group.head;
    await this.groupRepository.save(group);
    return group;
  }

  // remove(id: number) {
  //   const index = this.datasourceService
  //     .getGroups()
  //     .findIndex((group) => id === group.id);
  //   if (index == -1) return null;
  //   this.datasourceService.getGroups().splice(index, 1);
  //   return HttpStatus.OK;
  // }
  async remove(id: number){
    this.groupRepository.delete({id});
  }
}
