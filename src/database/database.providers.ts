import { DataSource } from 'typeorm';
import 'dotenv/config';

const dataSource = new DataSource({
    type: 'mysql',
    host: process.env.HOST,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    entities: [
        __dirname + '/../**/*.entity{.ts,.js}',
    ],
    // synchronize: true,
    migrations: ['dist/src/database/migrations/*.js']
});

export const databaseProviders = [
    {
        provide: 'DATA_SOURCE',
        useFactory: async () => {


            return dataSource.initialize();
        },
    },
];

export default dataSource;