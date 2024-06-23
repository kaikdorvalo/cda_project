import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
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
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
