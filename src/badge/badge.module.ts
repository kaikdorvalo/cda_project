import { Module } from '@nestjs/common';
import { BadgeService } from './badge.service';
import { BadgeController } from './badge.controller';
import { DatabaseModule } from 'src/database/database.module';
import { badgeProviders } from './badge.providers';
import { UserModule } from '../user/user.module';
import { userProviders } from '../user/user.providers';
import { badgeCategoriesProviders } from 'src/badge-category/badge-category.providers';

@Module({
  imports: [DatabaseModule, UserModule],
  controllers: [BadgeController],
  providers: [
    ...badgeProviders,
    ...userProviders,
    ...badgeCategoriesProviders,
    BadgeService
  ],
})
export class BagdeModule { }
