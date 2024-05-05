export class CreateTeacherDto {
    name: string; // Имя преподавателя
    subject: string; // Предмет
    groupIDs: number[]; // Группы, у которых ведет этот преподаватель
}
