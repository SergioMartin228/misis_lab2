import { CreateGroupDto } from './dto/CreateGroup.dto';
import { Group } from './group.entity';
import { GroupsService } from './groups.service';
import {
  Controller,
  Get,
  Param,
  Put,
  Post,
  Delete,
  Body,
  ForbiddenException,
} from '@nestjs/common';

@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Get()
  findAll() {
    return this.groupsService.findAll();
  }

  @Get('incomplete')
  findIncomplete() {
    return this.groupsService.findIncomplete();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const group = this.groupsService.findOne(+id);
    // if (!group) {
    //   // Группа не найдена
    //   throw new NotFoundException(`Group with id ${id} not found.`);
    // }
    return group;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatedGroup: Group) {
    // const year = parseInt(entryYear, 10);
    // const number = parseInt(groupNumber, 10);
    const result = this.groupsService.update(+id, updatedGroup);
    // if (!result) throw new NotFoundException(`Group with id ${id} not found.`);
    return result;
  }

  @Post()
  create(@Body() newGroup: CreateGroupDto) {
    const result = this.groupsService.create(newGroup);
    // if (!result)
    //   throw new ForbiddenException(
    //     `Group ${newGroup.name} with id ${newGroup.id} already exists.`,
    //   );

    return result;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    // const year = parseInt(entryYear, 10);
    // const number = parseInt(groupNumber, 10);
    const result = this.groupsService.remove(+id);
    // if (!result) throw new NotFoundException(`Group with id ${id} not found.`);
    return result;
  }
}
