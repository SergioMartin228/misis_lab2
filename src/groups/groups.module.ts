import { Module } from '@nestjs/common';
import { GroupsController } from './groups.controller';
import { GroupsService } from './groups.service';
import { DatasourceModule } from 'src/datasource/datasource.module';

@Module({
  controllers: [GroupsController],
  providers: [GroupsService],
  imports: [DatasourceModule],
})
export class GroupsModule {}
