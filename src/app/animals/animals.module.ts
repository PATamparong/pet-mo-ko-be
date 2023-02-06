import { Module } from '@nestjs/common';
import { AnimalsService } from './animals.service';
import { AnimalsController } from './animals.controller';
import { LowdbService } from 'src/lowdb/lowdb.service';

@Module({
  controllers: [AnimalsController],
  providers: [AnimalsService, LowdbService],
  exports: [AnimalsService],
})
export class AnimalsModule {}
