import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JerarchyPlanetService } from './jerarchy-planet.service';
import { JerarchyPlanetController } from './jerarchy-planet.controller';
import { Orbit } from './entities/orbit.entity';
import { CelestialObject } from '../shared/entities/celestial-object.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Orbit, CelestialObject])],
  controllers: [JerarchyPlanetController],
  providers: [JerarchyPlanetService],
})
export class JerarchyPlanetModule { }
