import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CometsService } from './comets.service';
import { CometsController } from './comets.controller';
import { Comet } from './entities/comet.entity';
import { CelestialObject } from '../shared/entities/celestial-object.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comet, CelestialObject])],
  controllers: [CometsController],
  providers: [CometsService],
})
export class CometsModule { }
