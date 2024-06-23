import { MigrationInterface, QueryRunner } from "typeorm";

export class Satart1719120179764 implements MigrationInterface {
    name = 'Satart1719120179764'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`badge\` (\`id\` int NOT NULL AUTO_INCREMENT, \`slug\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`image\` varchar(255) NOT NULL, \`active\` tinyint NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_5aa377eebdb63e850652f1e04c\` (\`slug\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_badge\` (\`id\` int NOT NULL AUTO_INCREMENT, \`redeemedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`userId\` int NULL, \`badgeId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`photo\` varchar(255) NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`active\` tinyint NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user_badge\` ADD CONSTRAINT \`FK_dc6bb11dce7a0a591b5cae0af25\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_badge\` ADD CONSTRAINT \`FK_8a49533f303db990198b8c9ddf7\` FOREIGN KEY (\`badgeId\`) REFERENCES \`badge\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_badge\` DROP FOREIGN KEY \`FK_8a49533f303db990198b8c9ddf7\``);
        await queryRunner.query(`ALTER TABLE \`user_badge\` DROP FOREIGN KEY \`FK_dc6bb11dce7a0a591b5cae0af25\``);
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`user_badge\``);
        await queryRunner.query(`DROP INDEX \`IDX_5aa377eebdb63e850652f1e04c\` ON \`badge\``);
        await queryRunner.query(`DROP TABLE \`badge\``);
    }

}
