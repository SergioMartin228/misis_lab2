import { Student } from './student.entity';
import { StudentsService } from './students.service';
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

@Controller('students')
export class StudentsController {
  constructor(private readonly studentService: StudentsService) {}

  @Get()
  findAll() {
    return this.studentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const student = this.studentService.findOne(+id);
    if (!student) throw new NotFoundException(`Student ${id} not found.`);
    return student;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatedStudent: Student) {
    const student = this.studentService.update(+id, updatedStudent);
    if (!student) throw new NotFoundException(`Student ${id} not found.`);
    return student;
  }

  @Post()
  create(@Body() newStudent: Student) {
    const result = this.studentService.create(newStudent);
    if (!result)
      throw new ForbiddenException(`Student ${newStudent.id} already exists.`);
    return result;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const result = this.studentService.remove(+id);
    if (!result) throw new NotFoundException(`Student ${id} not found.`);
    return result;
  }
}
