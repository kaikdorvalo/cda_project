import { Module } from '@nestjs/common';;
import { UserModule } from './user/user.module';
import 'dotenv/config';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { BagdeModule } from './badge/badge.module';
import { BadgeCategoryModule } from './badge-category/badge-category.module';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    AuthModule,
    BagdeModule,
    BadgeCategoryModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
