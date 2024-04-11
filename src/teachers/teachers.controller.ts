import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { Teacher } from './teacher.entity';

@Controller('teachers')
export class TeachersController {
  constructor(private readonly teacherService: TeachersService) {}

  @Get()
  findAll() {
    return this.teacherService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const teacher = this.teacherService.findOne(+id);
    if (!teacher) throw new NotFoundException(`Teacher ${id} not found.`);
    return teacher;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatedTeacher: Teacher) {
    const teacher = this.teacherService.update(+id, updatedTeacher);
    if (!teacher) throw new NotFoundException(`Teacher ${id} not found.`);
    return teacher;
  }

  @Post()
  create(@Body() newTeacher: Teacher) {
    const result = this.teacherService.create(newTeacher);
    if (!result)
      throw new ForbiddenException(`Teacher ${newTeacher.id} already exists.`);
    return result;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const result = this.teacherService.remove(+id);
    if (!result) throw new NotFoundException(`Teacher ${id} not found.`);
    return result;
  }

  @Put(':teacherId/groups/:groupId')
  addGroupToTeacher(
    @Param('teacherId') id: string,
    @Param('groupId') groupId: string,
  ) {
    const result = this.teacherService.addGroupToTeacher(+id, groupId);
    if (!result)
      throw new ForbiddenException(
        `Teacher ${id} not found or this teacher already has group ${groupId}.`,
      );
    return result;
  }
}
