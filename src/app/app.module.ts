import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import commonConfig from '../config/common.config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { LowdbService } from 'src/lowdb/lowdb.service';
import { AnimalsModule } from './animals/animals.module';

@Module({
  imports: [
    AnimalsModule,
    AuthModule,
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [commonConfig],
      cache: false,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, LowdbService],
})
export class AppModule {}
