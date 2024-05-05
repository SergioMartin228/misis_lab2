import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1714928580280 implements MigrationInterface {
    name = 'Initial1714928580280'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "teacher_group" DROP CONSTRAINT "FK_b808fa8a2b5239d4a60fcc4d592"`);
        await queryRunner.query(`ALTER TABLE "teacher_group" DROP CONSTRAINT "FK_f805ffd049734233350917c81ff"`);
        await queryRunner.query(`ALTER TABLE "teacher_group" ADD CONSTRAINT "FK_f805ffd049734233350917c81ff" FOREIGN KEY ("teacher_id") REFERENCES "teacher"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "teacher_group" ADD CONSTRAINT "FK_b808fa8a2b5239d4a60fcc4d592" FOREIGN KEY ("group_id") REFERENCES "group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "teacher_group" DROP CONSTRAINT "FK_b808fa8a2b5239d4a60fcc4d592"`);
        await queryRunner.query(`ALTER TABLE "teacher_group" DROP CONSTRAINT "FK_f805ffd049734233350917c81ff"`);
        await queryRunner.query(`ALTER TABLE "teacher_group" ADD CONSTRAINT "FK_f805ffd049734233350917c81ff" FOREIGN KEY ("teacher_id") REFERENCES "teacher"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "teacher_group" ADD CONSTRAINT "FK_b808fa8a2b5239d4a60fcc4d592" FOREIGN KEY ("group_id") REFERENCES "group"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
