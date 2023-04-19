import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import configuration from './config/configuration';

@Module({
  imports: [UsersModule , ConfigModule.forRoot({
    isGlobal : true ,
    load:[configuration]
  }), AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
