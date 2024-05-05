import { Group } from "src/groups/group.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne,OneToMany } from "typeorm";

@Entity('student')
export class Student {
    @PrimaryGeneratedColumn()
    id: number; //уникальный id студента
    @Column()
    name: string; //имя студента
    @Column()
    age: number; //возраст
    @ManyToOne(() => Group, group => group.students)
    group: Group //группа студента
  }