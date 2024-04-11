import { Group } from './group.entity';
import { GroupsService } from './groups.service';
import {
  Controller,
  Get,
  Param,
  NotFoundException,
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

  @Get(':name/:entryYear/:groupNumber')
  findOne(
    @Param('name') name: string,
    @Param('entryYear') entryYear: string,
    @Param('groupNumber') groupNumber: string,
  ) {
    // const year = parseInt(entryYear, 10);
    // const number = parseInt(groupNumber, 10);
    const group = this.groupsService.findOne(name, +entryYear, +groupNumber);

    if (!group) {
      // Группа не найдена
      throw new NotFoundException(
        `Group ${name}-${entryYear}-${groupNumber} not found.`,
      );
    }
    return group;
  }

  @Put(':name/:entryYear/:groupNumber')
  update(
    @Param('name') name: string,
    @Param('entryYear') entryYear: string,
    @Param('groupNumber') groupNumber: string,
    @Body() updatedGroup: Group,
  ) {
    // const year = parseInt(entryYear, 10);
    // const number = parseInt(groupNumber, 10);
    const result = this.groupsService.update(
      name,
      +entryYear,
      +groupNumber,
      updatedGroup,
    );
    if (!result)
      throw new NotFoundException(
        `Group ${name}-${entryYear}-${groupNumber} not found.`,
      );
    return result;
  }

  @Post()
  create(@Body() newGroup: Group) {
    const result = this.groupsService.create(newGroup);
    if (!result)
      throw new ForbiddenException(
        `Group ${newGroup.name}-${newGroup.entryYear}-${newGroup.groupNumber} already exists.`,
      );

    return result;
  }

  @Delete(':name/:entryYear/:groupNumber')
  remove(
    @Param('name') name: string,
    @Param('entryYear') entryYear: string,
    @Param('groupNumber') groupNumber: string,
  ) {
    // const year = parseInt(entryYear, 10);
    // const number = parseInt(groupNumber, 10);
    const result = this.groupsService.remove(name, +entryYear, +groupNumber);
    if (!result)
      throw new NotFoundException(
        `Group ${name}-${entryYear}-${groupNumber} not found.`,
      );
    return result;
  }
}
