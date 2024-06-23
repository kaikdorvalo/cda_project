import { MigrationInterface, QueryRunner } from "typeorm";

export class BadgeCategory1719125017592 implements MigrationInterface {
    name = 'BadgeCategory1719125017592'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`badge_category\` (\`id\` int NOT NULL AUTO_INCREMENT, \`categoryName\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`active\` tinyint NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user_badge\` DROP FOREIGN KEY \`FK_dc6bb11dce7a0a591b5cae0af25\``);
        await queryRunner.query(`ALTER TABLE \`user_badge\` DROP FOREIGN KEY \`FK_8a49533f303db990198b8c9ddf7\``);
        await queryRunner.query(`ALTER TABLE \`user_badge\` CHANGE \`userId\` \`userId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user_badge\` CHANGE \`badgeId\` \`badgeId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`photo\` \`photo\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user_badge\` ADD CONSTRAINT \`FK_dc6bb11dce7a0a591b5cae0af25\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_badge\` ADD CONSTRAINT \`FK_8a49533f303db990198b8c9ddf7\` FOREIGN KEY (\`badgeId\`) REFERENCES \`badge\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_badge\` DROP FOREIGN KEY \`FK_8a49533f303db990198b8c9ddf7\``);
        await queryRunner.query(`ALTER TABLE \`user_badge\` DROP FOREIGN KEY \`FK_dc6bb11dce7a0a591b5cae0af25\``);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`photo\` \`photo\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user_badge\` CHANGE \`badgeId\` \`badgeId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user_badge\` CHANGE \`userId\` \`userId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user_badge\` ADD CONSTRAINT \`FK_8a49533f303db990198b8c9ddf7\` FOREIGN KEY (\`badgeId\`) REFERENCES \`badge\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_badge\` ADD CONSTRAINT \`FK_dc6bb11dce7a0a591b5cae0af25\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`DROP TABLE \`badge_category\``);
    }

}
