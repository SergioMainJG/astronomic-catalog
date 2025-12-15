import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GalaxiesService } from './galaxies.service';
import { GalaxiesController } from './galaxies.controller';
import { Galaxy } from './entities/galaxy.entity';
import { CelestialObject } from '../shared/entities/celestial-object.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Galaxy, CelestialObject])],
  controllers: [GalaxiesController],
  providers: [GalaxiesService],
})
export class GalaxiesModule { }
