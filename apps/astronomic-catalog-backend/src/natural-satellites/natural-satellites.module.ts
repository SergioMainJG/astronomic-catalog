import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NaturalSatellitesService } from './natural-satellites.service';
import { NaturalSatellitesController } from './natural-satellites.controller';
import { NaturalSatellite } from './entities/natural-satellite.entity';
import { CelestialObject } from '../shared/entities/celestial-object.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NaturalSatellite, CelestialObject])],
  controllers: [NaturalSatellitesController],
  providers: [NaturalSatellitesService],
})
export class NaturalSatellitesModule { }
