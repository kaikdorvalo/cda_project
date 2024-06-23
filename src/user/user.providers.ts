import { DataSource } from 'typeorm';
import { User } from './entities/user.entity';
import { UserBadge } from './entities/user-badge.entity';

export const userProviders = [
    {
        provide: 'USER_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
        inject: ['DATA_SOURCE'],
    },
    {
        provide: 'USER_BADGE_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(UserBadge),
        inject: ['DATA_SOURCE'],
    }
];