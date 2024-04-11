import { Module } from '@nestjs/common';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';
import { DatasourceModule } from 'src/datasource/datasource.module';

@Module({
  controllers: [StudentsController],
  providers: [StudentsService],
  imports: [DatasourceModule],
})
export class StudentsModule {}
