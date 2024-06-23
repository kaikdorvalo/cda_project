import { DataSource } from 'typeorm';
import { BadgeCategory } from './entities/badge-category.entity';

export const badgeCategoriesProviders = [
    {
        provide: 'BADGE_CATEGORIES_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(BadgeCategory),
        inject: ['DATA_SOURCE'],
    },
];