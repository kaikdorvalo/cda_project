import { MigrationInterface, QueryRunner } from "typeorm";

export class Start1718956611171 implements MigrationInterface {
    name = 'Start1718956611171'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`badge\` (\`id\` int NOT NULL AUTO_INCREMENT, \`slug\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`image\` varchar(255) NOT NULL, \`active\` tinyint NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_5aa377eebdb63e850652f1e04c\` (\`slug\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`photo\` varchar(255) NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`active\` tinyint NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_badges_badge\` (\`userId\` int NOT NULL, \`badgeId\` int NOT NULL, INDEX \`IDX_94a92189996bfd88e831172d8a\` (\`userId\`), INDEX \`IDX_8dd5b219046bbd7266cb82ed71\` (\`badgeId\`), PRIMARY KEY (\`userId\`, \`badgeId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user_badges_badge\` ADD CONSTRAINT \`FK_94a92189996bfd88e831172d8ac\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`user_badges_badge\` ADD CONSTRAINT \`FK_8dd5b219046bbd7266cb82ed711\` FOREIGN KEY (\`badgeId\`) REFERENCES \`badge\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_badges_badge\` DROP FOREIGN KEY \`FK_8dd5b219046bbd7266cb82ed711\``);
        await queryRunner.query(`ALTER TABLE \`user_badges_badge\` DROP FOREIGN KEY \`FK_94a92189996bfd88e831172d8ac\``);
        await queryRunner.query(`DROP INDEX \`IDX_8dd5b219046bbd7266cb82ed71\` ON \`user_badges_badge\``);
        await queryRunner.query(`DROP INDEX \`IDX_94a92189996bfd88e831172d8a\` ON \`user_badges_badge\``);
        await queryRunner.query(`DROP TABLE \`user_badges_badge\``);
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP INDEX \`IDX_5aa377eebdb63e850652f1e04c\` ON \`badge\``);
        await queryRunner.query(`DROP TABLE \`badge\``);
    }

}
