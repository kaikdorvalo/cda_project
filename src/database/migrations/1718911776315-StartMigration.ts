import { MigrationInterface, QueryRunner } from "typeorm";

export class StartMigration1718911776315 implements MigrationInterface {
    name = 'StartMigration1718911776315'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`photo\` varchar(255) NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`active\` tinyint NOT NULL, \`createdAt\` datetime NOT NULL, \`updatedAt\` datetime NOT NULL, UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
    }

}
