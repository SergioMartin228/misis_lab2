import { Student } from 'src/students/student.entity';
import { Teacher } from 'src/teachers/teacher.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('group')
export class Group {
  @PrimaryGeneratedColumn() //колонка - идентификатор, значение генерируется автоматически
  id: number;
  @Column({})
  name: string; // Направление обучения, например "БИВТ-22-1"
  @Column()
  course: number; // Курс, на котором находится группа
  @Column()
  institute: string; // Название института или факультета
  @OneToMany((type) => Student, (student) => student.group)
  students: Student[];
  @ManyToMany(() => Teacher, (teacher) => teacher.groups)
  @JoinTable({
    name: 'teacher_group',
    joinColumn: { name: 'group_id' },
    inverseJoinColumn: { name: 'teacher_id' },
  })
  teachers: Teacher[]; //преподаватели этой группы
  // Дополнительные свойства
  @OneToOne(() => Student, (head) => head.id)
  head?: Student; // Староста группы, необязательное поле
  //декоратор(
  //функция_возвращающая_тип_сущности,
  //функция_определяющая_связь_на_уровне_поля)
}
