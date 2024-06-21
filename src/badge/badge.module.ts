import { Module } from '@nestjs/common';
import { BadgeService } from './badge.service';
import { BadgeController } from './badge.controller';
import { DatabaseModule } from 'src/database/database.module';
import { badgeProviders } from './badge.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [BadgeController],
  providers: [
    ...badgeProviders,
    BadgeService
  ],
})
export class BagdeModule { }
