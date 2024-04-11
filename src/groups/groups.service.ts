import { HttpStatus, Injectable, Module } from '@nestjs/common';
import { DatasourceService } from '../datasource/datasource.service';
import { Group } from './group.entity';

@Injectable()
export class GroupsService {
  constructor(private readonly datasourceService: DatasourceService) {}

  create(group: Group) {
    if (this.findOne(group.name, group.entryYear, group.groupNumber))
      return null;
    this.datasourceService.getGroups().push(group);
    return group;
  }

  findOne(name: string, entryYear: number, groupNumber: number) {
    const groupId = name + '-' + entryYear + '-' + groupNumber;
    return this.datasourceService
      .getGroups()
      .find((group) => groupId === this.getGroupId(group));
  }

  findAll(): Group[] {
    return this.datasourceService.getGroups();
  }

  update(
    name: string,
    entryYear: number,
    groupNumber: number,
    updatedGroup: Group,
  ) {
    const groupId = name + '-' + entryYear + '-' + groupNumber;
    const index = this.datasourceService
      .getGroups()
      .findIndex((group) => groupId === this.getGroupId(group));
    if (index == -1) return null;
    this.datasourceService.getGroups()[index] = updatedGroup;

    return this.datasourceService.getGroups()[index];
  }

  remove(name: string, entryYear: number, groupNumber: number) {
    const groupId = name + '-' + entryYear + '-' + groupNumber;
    const index = this.datasourceService
      .getGroups()
      .findIndex((group) => groupId === this.getGroupId(group));
    if (index == -1) return null;
    this.datasourceService.getGroups().splice(index, 1);
    return HttpStatus.OK;
  }

  getGroupId(group: Group) {
    return `${group.name}-${group.entryYear}-${group.groupNumber}`;
  }
}
