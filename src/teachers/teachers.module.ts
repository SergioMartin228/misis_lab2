import { Module } from '@nestjs/common';
import { TeachersController } from './teachers.controller';
import { TeachersService } from './teachers.service';
import { DatasourceModule } from 'src/datasource/datasource.module';
import { Group } from 'src/groups/group.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teacher } from './teacher.entity';
import { Student } from 'src/students/student.entity';

@Module({
  controllers: [TeachersController],
  providers: [TeachersService],
  imports: [DatasourceModule,
    TypeOrmModule.forFeature([Group, Teacher, Student])
  ],
})
export class TeachersModule {}
