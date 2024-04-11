import { Module } from '@nestjs/common';
import { GroupsModule } from './groups/groups.module';
import { DatasourceModule } from './datasource/datasource.module';
import { StudentsModule } from './students/students.module';
import { TeachersModule } from './teachers/teachers.module';

@Module({
  imports: [GroupsModule, DatasourceModule, TeachersModule, StudentsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
