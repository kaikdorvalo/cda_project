import { Module } from '@nestjs/common';
import { BadgeCategoryService } from './badge-category.service';
import { BadgeCategoryController } from './badge-category.controller';
import { DatabaseModule } from 'src/database/database.module';
import { badgeCategoriesProviders } from './badge-category.providers';
import { UserModule } from 'src/user/user.module';
import { userProviders } from 'src/user/user.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [BadgeCategoryController],
  providers: [
    ...badgeCategoriesProviders,
    ...userProviders,
    BadgeCategoryService
  ],
  exports: [BadgeCategoryService]
})
export class BadgeCategoryModule { }
