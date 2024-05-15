import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateStudentDto } from './dto/CreateStudent.dto';
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

@ApiTags('Студенты')
@Controller('students')
export class StudentsController {
  constructor(private readonly studentService: StudentsService) {}

  @ApiOperation({ summary: 'Получение всех студентов' })
  @Get()
  findAll() {
    return this.studentService.findAll();
  }

  @ApiOperation({ summary: 'Получение студента по id' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    const student = this.studentService.findOne(+id);
    // if (!student) throw new NotFoundException(`Student ${id} not found.`);
    return student;
  }

  @ApiOperation({ summary: 'Изменение студента' })
  @Put(':id')
  update(@Param('id') id: string, @Body() updatedStudent: Student) {
    const student = this.studentService.update(+id, updatedStudent);
    // if (!student) throw new NotFoundException(`Student ${id} not found.`);
    return student;
  }

  @ApiOperation({ summary: 'Создание студента' })
  @Post()
  create(@Body() newStudent: CreateStudentDto) {
    const result = this.studentService.create(newStudent);
    // if (!result)
    //   throw new ForbiddenException(`Student ${newStudent.id} already exists.`);
    return result;
  }

  @ApiOperation({ summary: 'Удаление студента' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    const result = this.studentService.remove(+id);
    // if (!result) throw new NotFoundException(`Student ${id} not found.`);
    return result;
  }
}
