import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StarsService } from './stars.service';
import { StarsController } from './stars.controller';
import { Star } from './entities/star.entity';
import { CelestialObject } from '../shared/entities/celestial-object.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Star, CelestialObject])],
  controllers: [StarsController],
  providers: [StarsService],
})
export class StarsModule { }
