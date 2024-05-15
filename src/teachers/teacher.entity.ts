import { Group } from 'src/groups/group.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity('teacher')
export class Teacher {
  @PrimaryGeneratedColumn()
  id: number; // Уникальный идентификатор
  @Column()
  name: string; // Имя преподавателя
  @Column()
  subject: string; // Предмет
  @ManyToMany(() => Group, (group) => group.teachers, { onDelete: 'CASCADE' })
  // @JoinTable({
  //   name: 'teacher_group',
  //   joinColumn: { name: 'teacher_id' },
  //   inverseJoinColumn: { name: 'group_id' },
  // })
  groups: Group[]; // Группы, у которых ведет этот преподаватель
}
