import { Module } from '@nestjs/common';
import { TeachersController } from './teachers.controller';
import { TeachersService } from './teachers.service';
import { DatasourceModule } from 'src/datasource/datasource.module';

@Module({
  controllers: [TeachersController],
  providers: [TeachersService],
  imports: [DatasourceModule],
})
export class TeachersModule {}
