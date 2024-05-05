import { Module } from '@nestjs/common';
import { GroupsController } from './groups.controller';
import { GroupsService } from './groups.service';
import { DatasourceModule } from 'src/datasource/datasource.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from './group.entity';
import { Student } from 'src/students/student.entity';
import { Teacher } from 'src/teachers/teacher.entity';

@Module({
  controllers: [GroupsController],
  providers: [GroupsService],
  imports: [DatasourceModule,
    TypeOrmModule.forFeature([Group, Student, Teacher])
  ],
})
export class GroupsModule {}
