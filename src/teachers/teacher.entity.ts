export class Teacher {
    id: number; // Уникальный идентификатор
    name: string; // Имя преподавателя
    subject: string; // Предмет
    groupIds: string[]; // Группы, у которых ведет этот преподаватель

    constructor(id: number, name: string, subject: string) {
        this.id = id;
        this.name = name;
        this.subject = subject;
        this.groupIds = [];
      }
  }
  