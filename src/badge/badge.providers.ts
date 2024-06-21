import { DataSource } from 'typeorm';
import { Badge } from './entities/bagde.entity';

export const badgeProviders = [
    {
        provide: 'BADGE_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Badge),
        inject: ['DATA_SOURCE'],
    },
];