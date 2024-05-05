import { Module } from '@nestjs/common';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';
import { DatasourceModule } from 'src/datasource/datasource.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from 'src/groups/group.entity';
import { Student } from './student.entity';
import { Teacher } from 'src/teachers/teacher.entity';

@Module({
  controllers: [StudentsController],
  providers: [StudentsService],
  imports: [DatasourceModule, TypeOrmModule.forFeature([Group, Student, Teacher])],
})
export class StudentsModule {}
