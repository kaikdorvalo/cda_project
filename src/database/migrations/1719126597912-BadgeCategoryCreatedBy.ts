import { MigrationInterface, QueryRunner } from "typeorm";

export class BadgeCategoryCreatedBy1719126597912 implements MigrationInterface {
    name = 'BadgeCategoryCreatedBy1719126597912'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`badge_category\` ADD UNIQUE INDEX \`IDX_663bf16145c23f9493c8c9b3da\` (\`categoryName\`)`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`photo\` \`photo\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user_badge\` DROP FOREIGN KEY \`FK_dc6bb11dce7a0a591b5cae0af25\``);
        await queryRunner.query(`ALTER TABLE \`user_badge\` DROP FOREIGN KEY \`FK_8a49533f303db990198b8c9ddf7\``);
        await queryRunner.query(`ALTER TABLE \`user_badge\` CHANGE \`userId\` \`userId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user_badge\` CHANGE \`badgeId\` \`badgeId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user_badge\` ADD CONSTRAINT \`FK_dc6bb11dce7a0a591b5cae0af25\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_badge\` ADD CONSTRAINT \`FK_8a49533f303db990198b8c9ddf7\` FOREIGN KEY (\`badgeId\`) REFERENCES \`badge\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_badge\` DROP FOREIGN KEY \`FK_8a49533f303db990198b8c9ddf7\``);
        await queryRunner.query(`ALTER TABLE \`user_badge\` DROP FOREIGN KEY \`FK_dc6bb11dce7a0a591b5cae0af25\``);
        await queryRunner.query(`ALTER TABLE \`user_badge\` CHANGE \`badgeId\` \`badgeId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user_badge\` CHANGE \`userId\` \`userId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user_badge\` ADD CONSTRAINT \`FK_8a49533f303db990198b8c9ddf7\` FOREIGN KEY (\`badgeId\`) REFERENCES \`badge\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_badge\` ADD CONSTRAINT \`FK_dc6bb11dce7a0a591b5cae0af25\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`photo\` \`photo\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`badge_category\` DROP INDEX \`IDX_663bf16145c23f9493c8c9b3da\``);
    }

}
